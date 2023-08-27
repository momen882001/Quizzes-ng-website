import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StudentService } from '../../student.service';
import { CountdownEvent } from 'ngx-countdown';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit, OnDestroy {
  timerSubscription!: Subscription;
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}
  examId!: string;
  time!: any;
  examData!: any;
  titleExam!: string;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      correctLists: new FormArray([
        new FormGroup({
          answerId: new FormControl(''),
          questionId: new FormControl(''),
        }),
      ]),
    });
    this.route.params.subscribe((params: Params) => {
      this.examId = params['examId'];
    });
    this.studentService.getExam(this.examId).subscribe(
      (resData: any) => {
        console.log(resData);
        console.log(resData.data);
        this.examData = resData.data;
        this.titleExam = resData.data[0].titleExam;
        this.time = resData.data[0].duration * 60;
        console.log(resData.data[0].duration);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  handleEvent(event: CountdownEvent) {
    if (event.left === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Timeout',
        text: 'Exam Submitted',
      });
    }
  }

  submitForm() {
    console.log(this.validateForm.value);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
