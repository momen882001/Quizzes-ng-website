import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StudentService } from '../../student.service';
import { CountdownEvent } from 'ngx-countdown';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  timerSubscription!: Subscription;
  validateForm!: UntypedFormGroup;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  examId!: string;
  time!: number;
  examData: any[] = [];
  titleExam!: string;
  currentQuestion: number = 0;
  answerIdValue: string = '';
  isSubmitted: boolean = false;
  examResult!: string;

  correctLists: testObject[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['examId'];
    });
    this.studentService.getExam(this.examId).subscribe(
      (resData: any) => {
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

  onNext(quesId: string, answerId: string, nextQuestId:string) {
    if (this.currentQuestion < this.examData.length - 1) {
      console.log('OO: ' + this.examData);
      this.currentQuestion++;
      let isExist: boolean = false;
      let itemIndex: number = 0;
      for (let index = 0; index < this.correctLists.length; index++) {
        const item: testObject = this.correctLists[index];
        console.log(item);
        if (item.questionId === quesId) {
          isExist = true;
          itemIndex = index;
          break;
        }
      }
      if (isExist) {
        this.correctLists[itemIndex].answerId = answerId;
      } else {
        this.correctLists.push({
          questionId: quesId,
          answerId: answerId,
        });
      }
      // //////////////////
      this.getQuestion(nextQuestId);

    }
    console.log(this.correctLists);
  }


  getQuestion(QuestId:string){
   let isExist:boolean = false;
    let itemIndex:number = 0;
    for (let index = 0; index < this.correctLists.length; index++) {
      const item: testObject = this.correctLists[index];
      console.log(item);
      if (item.questionId === QuestId) {
        isExist = true;
        itemIndex = index;
        break;
      }
    }
    console.log(isExist);
    console.log(QuestId);
    console.log(itemIndex);
    console.log(this.correctLists[itemIndex].answerId);
    console.log(this.answerIdValue);
    if (isExist) {
      // this.correctLists[itemIndex].answerId = answerId;
      this.answerIdValue = this.correctLists[itemIndex].answerId
    } else {
      this.answerIdValue = ''
    }
  }

  onBack(prevQuesId:string) {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.getQuestion(prevQuesId);
    }
  }

  onSubmit(quesId: string, answerId: string) {
    this.correctLists.push({
      questionId: quesId,
      answerId: answerId,
    });
    this.studentService.finishExam(this.examId, this.correctLists).subscribe(
      (resData: any) => {
        console.log(resData);
        this.examResult = resData.data;
        this.isSubmitted = true;
      },
      (err: any) => {
        console.log(err);
      }
    );
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

  navigateHistory() {
    this.router.navigate(['student/examsHistory']);
  }
}

interface testObject {
  questionId: string;
  answerId: string;
}
