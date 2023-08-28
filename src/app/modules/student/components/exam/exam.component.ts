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
  examData : any[] = []
  titleExam!: string;
  currentQuestion: number = 0;

  correctLists: testObject[] = []

  ngOnInit(): void {
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

  onNext(quesId: string, answerId: string) {
    if (this.currentQuestion < this.examData.length - 1) {
      this.currentQuestion++;
      this.correctLists.push({
        questionId: quesId,
        answerId: answerId,
      });
    }
  }

  onBack() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  onSubmit() {
    console.log(this.correctLists);

  }

  testRadio(event: any) {
    console.log(event.target?.value);
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

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}

interface testObject {
  questionId: string;
  answerId: string;
}

// answerlist
// :
// (2) [{…}, {…}]
// description
// :
// "no description"
// duration
// :
// 20
// id
// :
// "96704770-f642-42d4-9486-3394463e5366"
// questions
// :
// "Test question"
// title
// :
// "Test"
// titleExam
// :
// "Test Exam"

// answer
// :
// "2"
// id
// :
// "7e6c08ef-9716-497c-bd45-9ea0d0fd63cc"
