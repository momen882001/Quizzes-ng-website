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
    return this.http.get<viewQuestionInterface[]>(environment.APIUrl + 'ShowAllQuestion', {
      params: new HttpParams().set('levelId', levelId),
    });
  }
}
