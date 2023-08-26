import { ActivatedRoute, Params } from '@angular/router';
import { Component, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StudentService } from '../../student.service';
import {
  CountdownComponent,
  CountdownConfig,
  CountdownEvent,
} from 'ngx-countdown';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit , OnDestroy {
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  timerSubscription!: Subscription;
  private config!: CountdownConfig;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}
  examId!: string;
  time: number = 40;

  ngOnInit(): void {
    this.timerSubscription = interval(10000).subscribe((x) => {
      console.log(x);
      this.time--;
    });
    this.route.params.subscribe((params: Params) => {
      this.examId = params['examId'];
    });
    this.studentService.startExam(this.examId).subscribe(
      (resData: any) => {
        console.log(resData);
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log(this.countdown);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
