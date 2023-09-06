import { Component, OnInit } from '@angular/core';
import { CreateQuestionService } from '../questions/service/create-questions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
})
export class EditQuestionComponent implements OnInit {
  validateForm!: FormGroup;
  quesId!: string;
  quesData!: any;

  constructor(
    private questionService: CreateQuestionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.quesId = params['quesId'];
    });
    this.questionService.getQuestionData(this.quesId).subscribe(
      (resData: any) => {
        console.log(resData);
        this.quesData = resData.data;
        this.validateForm.patchValue({
          title: resData.data.title,
          questions: resData.data.questions,
          skillName: resData.data.skillLevel,
          description: resData.data.description,
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      questions: ['', [Validators.required]],
      skillName: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const title = this.validateForm.value.title;
      const description = this.validateForm.value.description;
      const questions = this.validateForm.value.questions;
      const skillName = this.validateForm.value.skillName;
      this.questionService
        .editQuestion(this.quesId, title, description, skillName, questions)
        .subscribe(
          (resData: any) => {
            console.log(resData);
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          (err) => {
            console.log(err);
          }
        );
      console.log(this.validateForm.value);
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
