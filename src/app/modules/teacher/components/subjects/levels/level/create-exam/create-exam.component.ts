import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { CreateExamService } from './service/create-exam.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewExamsService } from '../view-exams/service/view-exams.service';
import Swal from 'sweetalert2';

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
    private viewExamService: ViewExamsService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editMode) {
        const title = this.validateForm.value.title;
        const questionCount = this.validateForm.value.questionCount;
        const duration = this.validateForm.value.duration;
        this.viewExamService
          .editExam(this.examId, title, questionCount, duration)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.router.navigate(['../../'], { relativeTo: this.route });
            },
            (err: any) => {
              console.log(err);
            }
          );
      } else {
        const title = this.validateForm.value.title;
        const questionCount = this.validateForm.value.questionCount;
        const duration = this.validateForm.value.duration;
        this.createExamService
          .onCreateExam(title, questionCount, duration, this.levelId)
          .subscribe(
            (resData: any) => {
              this.examLink = resData.data;
              console.log(resData.data);
              if (resData.data === null) {
                Swal.fire({
                  icon: 'error',
                  title : 'Add more level questions',
                  text: 'number of exam questions is less than number of level questions',
                })
              } else {
                Swal.fire({
                  icon: 'success',
                  title : 'exam link',
                  text: `${resData.data}`,
                })
              }
              this.alertToggle = true;
            },
            (err) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                text: `${err.error.Message}`,
              })
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
          duration: res.data.duration,
        });
      });
    }
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      questionCount: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      duration: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
    });
  }
}
