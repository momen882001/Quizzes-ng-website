import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StudentService } from '../../student.service';
import {
  CountdownEvent,
} from 'ngx-countdown';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit, OnDestroy {
  timerSubscription!: Subscription;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}
  examId!: string;
  time! : any
  examData! : any

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['examId'];
    });
    this.studentService.getExam(this.examId).subscribe(
      (resData: any) => {
        console.log(resData);
        console.log(resData.data);
        this.time = resData.data[0].duration * 60
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

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
