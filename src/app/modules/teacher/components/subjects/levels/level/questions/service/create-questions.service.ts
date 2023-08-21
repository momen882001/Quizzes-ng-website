import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CreateQuestionService {
  constructor(private http: HttpClient, private router :Router) {}

  createQuestion(
    title: string,
    description: string,
    questions: string,
    skillName: number,
    levelId: string,
    answersList: { answer: string; isCorrect: boolean }[]
  ) {
    this.http
      .post(environment.APIUrl + 'CreateQuestion', {
        title,
        description,
        questions,
        skillName,
        levelId,
        answersList,
      })
      .subscribe(
        (resData: any) => {
          console.log(resData);
          this.router.navigate(['/teacher/subjects'])
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
