import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CreateExamService } from './service/create-exam.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewExamsService } from '../view-exams/service/view-exams.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css'],
})
export class CreateExamComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  levelId!: string;
  alertToggle: boolean = false;
  examLink!: string;
  editMode: boolean = false;
  examId!: string;


  constructor(
    private fb: UntypedFormBuilder,
    private createExamService: CreateExamService,
    private route: ActivatedRoute,
    private router: Router,
    private viewExamService: ViewExamsService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editMode) {
        console.log(this.validateForm.value);
      } else {
        const title = this.validateForm.value.title;
        const questionCount = this.validateForm.value.questionCount;
        const duration = this.validateForm.value.duration
          .toString()
          .split(' ')[4];
        this.createExamService
          .onCreateExam(title, questionCount, duration, this.levelId)
          .subscribe(
            (resData: any) => {
              this.examLink = resData.data;
              console.log(resData.data);

              this.alertToggle = true;
            },
            (err) => {
              console.log(err);
              console.log(err.error.message);
            }
          );
      }
      this.validateForm.reset();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.alertToggle = false;
    this.route.params.subscribe((params: Params) => {
      this.levelId = params['levelId'];
      this.examId = params['examId'];
      this.editMode = params['examId'] != null;
    });
    this.initForm();
  }

  private initForm() {
    if (this.editMode) {
      console.log('edit mode');
      this.viewExamService.getExam(this.examId).subscribe((res: any) => {
        console.log(res.data.title);
        this.validateForm.patchValue({
          title: res.data.title,
          questionCount: res.data.questionCount,
        })
      });
    }
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      questionCount: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      duration: [null, [Validators.required]],
    });
  }
}
