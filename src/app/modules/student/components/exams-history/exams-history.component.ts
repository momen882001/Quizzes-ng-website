import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-exams-history',
  templateUrl: './exams-history.component.html',
  styleUrls: ['./exams-history.component.css'],
})
export class ExamsHistoryComponent implements OnInit {
  totalPages!: number;
  totalCount!: number;
  pageNumber!: number;
  constructor(private studentService: StudentService) {}

  listOfCurrentPageData: readonly {
    exmaId: string;
    title: string;
    questionCount: number;
    duration: number;
    score: number;
    examDate: string;
  }[] = [];

  exams: {
    exmaId: string;
    title: string;
    questionCount: number;
    duration: number;
    score: number;
    examDate: string;
  }[] = [];
  ngOnInit(): void {
    this.loadExamsHistory();
  }

  onPageIndexChange(pageIndex: number) {
    console.log(pageIndex);
    this.pageNumber = pageIndex;
    this.studentService.studentExamsHistory(5, pageIndex).subscribe(
      (resData: any) => {
        console.log(resData);
        this.exams = resData.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // onCurrentPageDataChange(
  //   listOfCurrentPageData: readonly {
  //     exmaId: string;
  //     title: string;
  //     questionCount: number;
  //     duration: number;
  //     score: number;
  //     examDate: string;
  //   }[]
  // ): void {
  //   this.listOfCurrentPageData = listOfCurrentPageData;
  // }

  private loadExamsHistory() {
    this.studentService.studentExamsHistory(5, this.pageNumber).subscribe(
      (resData: any) => {
        console.log(resData);
        console.log(resData.totalPages);
        console.log(resData.totalcount);
        this.exams = resData.data;
        this.totalPages = resData.totalPages;
        this.totalCount = resData.totalcount;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
