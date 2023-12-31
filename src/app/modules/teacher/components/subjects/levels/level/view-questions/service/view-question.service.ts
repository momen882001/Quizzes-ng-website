import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { viewQuestionInterface } from '../../level-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ViewQuestionService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllQuestions(levelId: string) {
    return this.http.get<viewQuestionInterface[]>(
      environment.APIUrl + 'ShowAllQuestions',
      {
        params: new HttpParams().set('levelId', levelId),
      }
    );
  }

  deleteQuestion(questionId: string) {
    return this.http.delete(environment.APIUrl + 'DeleteQuestion', {
      params: new HttpParams().set('id', questionId),
    });
  }

  deleteAnswer(answerId: string) {
    return this.http.delete(environment.APIUrl + 'DeleteAnswer', {
      params: new HttpParams().set('id', answerId),
    });
  }
}
