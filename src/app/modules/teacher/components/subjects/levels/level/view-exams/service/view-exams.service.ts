import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { viewExamsInterface } from '../../level-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ViewExamsService {
  constructor(private http: HttpClient, private router: Router) {}

  getExams(LevelId: string) {
    return this.http.get<viewExamsInterface[]>(
      environment.APIUrl + 'GetTeacherExams',
      {
        params: new HttpParams().set('LevelId', LevelId),
      }
    );
  }

  deleteExam(examId: string) {
    return this.http.delete(environment.APIUrl + 'DeleteExam', {
      params: new HttpParams().set('id', examId),
    });
  }

  getExam(examId: string) {
    return this.http.get(environment.APIUrl + 'GetExamById', {
      params: new HttpParams().set('id', examId),
    });
  }

  editExam(id: string, title: string, questionCount: number, duration: string) {
    return this.http.put(environment.APIUrl + 'EditExam', {
      id,
      title,
      questionCount,
      duration,
    });
  }
}
