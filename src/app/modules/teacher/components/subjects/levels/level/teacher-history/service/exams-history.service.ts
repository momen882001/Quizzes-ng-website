import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { viewExamsInterface } from '../../level-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExamsHistoryService {
  constructor(private http: HttpClient) {}

  getExamsHistory(examId: string) {
    return this.http.get(environment.APIUrl + 'ExamHistory', {
      params: new HttpParams().set('ExamId', examId),
    });
  }
}
