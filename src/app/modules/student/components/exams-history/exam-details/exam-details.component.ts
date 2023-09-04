import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../student.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css'],
})
export class ExamDetailsComponent implements OnInit {
  examDetails : any[] = []
  examId!: string;
  examDate!: string;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['examId'];
      this.examDate = params['examDate'];
    });
    this.loadExamDetails();
  }

  private loadExamDetails() {
    this.studentService
      .getExamQuestionsDetails(this.examId, this.examDate)
      .subscribe(
        (resData: any) => {
          console.log(resData);
          console.log(resData.data);
          this.examDetails = resData.data
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
