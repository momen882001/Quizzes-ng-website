import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}
  examId!: string;
  time : number = 875677

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
  }
}
