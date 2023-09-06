import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateQuestionService } from '../../questions/service/create-questions.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css'],
})
export class AddAnswerComponent implements OnInit {
  validateForm!: FormGroup;
  quesId!: string;
  answerId!: string;
  editFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private questionService: CreateQuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.quesId = params['quesId'];
      this.answerId = params['answerId'];
      this.editFlag = params['answerId'] != null;
    });
    // this.validateForm = this.fb.group({
    //   answer: ['', Validators.required],
    //   isCorrect: [null, Validators.required],
    // });
    this.initForm();
  }

  private initForm() {
    if (this.editFlag) {
      this.questionService.getAnswer(this.answerId).subscribe(
        (resData: any) => {
          console.log(resData);
          this.validateForm.patchValue({
            answer: resData.data.answer,
            isCorrect: resData.data.isCorrect,
          });
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    this.validateForm = this.fb.group({
      answer: ['', Validators.required],
      isCorrect: [null, Validators.required],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editFlag) {
        console.log('edit');

        const answer = this.validateForm.value.answer;
        const isCorrect = this.validateForm.value.isCorrect;
        this.questionService
          .editAnswer(this.answerId, answer, isCorrect, this.quesId)
          .subscribe(
            (resData: any) => {
              console.log(resData);
              this.router.navigate(['../../../'], { relativeTo: this.route });
            },
            (err: any) => {
              console.log(err);
            }
          );
      } else {
        const answer = this.validateForm.value.answer;
        const isCorrect = this.validateForm.value.isCorrect;
        this.questionService
          .addAnswer(answer, isCorrect, this.quesId)
          .subscribe(
            (resData: any) => {
              console.log(resData);
              this.router.navigate(['../../'], { relativeTo: this.route });
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
