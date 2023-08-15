import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { CreateExamService } from './service/create-exam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css'],
})
export class CreateExamComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private createExamService: CreateExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      this.createExamService.onCreateExam(this.validateForm.value).subscribe(
        (resData) => {
          console.log(resData);
          this.router.navigate(['../'], { relativeTo: this.route });
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      examTitle: [null, [Validators.required]],
      questionNumber: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      time: [null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
    });
  }
}
