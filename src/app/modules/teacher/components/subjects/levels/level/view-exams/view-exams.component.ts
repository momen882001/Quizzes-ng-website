import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewExamsService } from './service/view-exams.service';
import { viewExamsInterface } from '../level-interfaces';
import { ClipboardService } from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css'],
})
export class ViewExamsComponent implements OnInit {
  levelId!: string;
  examsData!: viewExamsInterface[];

  constructor(
    private route: ActivatedRoute,
    private viewExamsService: ViewExamsService,
    private clipboardApi: ClipboardService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.levelId = params['levelId'];
    });
    this.loadTeacherExams();
  }

  copyText(url: string) {
    this.clipboardApi.copyFromContent(url);
    this.message.create('success', 'Copy to clipboard successfuly', {
      nzDuration: 3000,
    });
  }

  cancel(): void {
    //
  }

  confirm(examId: string): void {
    this.viewExamsService.deleteExam(examId).subscribe(
      (resData: any) => {
        console.log(resData);
        this.loadTeacherExams();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private loadTeacherExams() {
    this.viewExamsService.getExams(this.levelId).subscribe(
      (res: any) => {
        console.log(res.data);
        this.examsData = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
