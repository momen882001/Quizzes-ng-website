import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { CreateExamService } from './service/create-exam.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css'],
})
export class CreateExamComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  levelId!: string;
  constructor(
    private fb: UntypedFormBuilder,
    private createExamService: CreateExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const title = this.validateForm.value.title;
      const questionCount = this.validateForm.value.questionCount;
      const duration = this.validateForm.value.duration.toString().split(' ')[4];
      this.createExamService
        .onCreateExam(title, questionCount, duration, this.levelId)
        .subscribe(
          (resData: any) => {
            console.log(resData.data);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  log(time: Date): void {
    console.log(time && time.toTimeString());
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      questionCount: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      duration: [null, [Validators.required]],
    });

    this.route.params.subscribe((params: Params) => {
      this.levelId = params['levelId'];
      console.log(this.levelId);
    });
  }
}
