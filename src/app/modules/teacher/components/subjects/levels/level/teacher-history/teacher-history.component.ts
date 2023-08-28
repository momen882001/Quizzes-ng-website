import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExamsHistoryService } from './service/exams-history.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-history',
  templateUrl: './teacher-history.component.html',
  styleUrls: ['./teacher-history.component.css'],
})
export class TeacherHistoryComponent implements OnInit {
  examId!: string;
  examsHistory! : any[]
  constructor(
    private examHistoryService: ExamsHistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['examId'];
    });
    this.loadExamsHistory();
  }

  private loadExamsHistory(): void {
    this.examHistoryService.getExamsHistory(this.examId).subscribe(
      (resData: any) => {
        console.log(resData.data);
        console.log(resData);
        this.examsHistory = resData.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
