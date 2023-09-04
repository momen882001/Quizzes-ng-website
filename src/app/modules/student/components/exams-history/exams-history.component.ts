import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-exams-history',
  templateUrl: './exams-history.component.html',
  styleUrls: ['./exams-history.component.css'],
})
export class ExamsHistoryComponent implements OnInit {
  constructor(private studentService: StudentService) {}

  listOfCurrentPageData: readonly {
    exmaId : string;
    title: string;
    questionCount: number;
    duration: number;
    score: number;
    examDate: string;
  }[] = [];

  exams: {
    exmaId : string;
    title: string;
    questionCount: number;
    duration: number;
    score: number;
    examDate: string;
  }[] = [];
  ngOnInit(): void {
    this.loadExamsHistory();
  }

  onCurrentPageDataChange(
    listOfCurrentPageData: readonly {
      exmaId : string;
      title: string;
      questionCount: number;
      duration: number;
      score: number;
      examDate: string;
    }[]
  ): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  private loadExamsHistory() {
    this.studentService.studentExamsHistory().subscribe(
      (resData: any) => {
        console.log(resData);
        this.exams = resData.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
