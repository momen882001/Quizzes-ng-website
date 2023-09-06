import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CreateQuestionService {
  constructor(private http: HttpClient, private router: Router) {}

  createQuestion(
    title: string,
    description: string,
    questions: string,
    skillName: number,
    levelId: string,
    answersLists: { answer: string; isCorrect: boolean }[]
  ) {
    return this.http.post(environment.APIUrl + 'CreateQuestion', {
      title,
      description,
      questions,
      skillName,
      levelId,
      answersLists,
    });
  }

  // edit question part
  getQuestionData(quesId: string) {
    return this.http.get(environment.APIUrl + 'GetQuestionById', {
      params: new HttpParams().set('id', quesId),
    });
  }

  editQuestion(
    id: string,
    title: string,
    description: string,
    skillName: number,
    questions: string
  ) {
    return this.http.put(environment.APIUrl + 'EditQuestion', {
      id,
      title,
      description,
      skillName,
      questions,
    });
  }

  addAnswer(answer: string, isCorrect: boolean, questionId: string) {
    return this.http.post(environment.APIUrl + 'AddAnswer', {
      answer,
      isCorrect,
      questionId,
    });
  }

  editAnswer(
    id: string,
    answer: string,
    isCorrect: boolean,
    questionId: string
  ) {
    return this.http.put(environment.APIUrl + 'EditAnswer', {
      id,
      answer,
      isCorrect,
      questionId,
    });
  }
}
