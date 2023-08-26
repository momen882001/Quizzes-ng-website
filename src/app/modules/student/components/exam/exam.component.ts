import { ActivatedRoute, Params } from '@angular/router';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../student.service';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  private config!: CountdownConfig;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}
  examId!: string;
  time : number = 40

  ngOnInit(): void {
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

}
