import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getExam(examId: string) {
    return this.http.get(environment.APIUrl + 'ExamQuestions', {
      params: new HttpParams().set('ExamId', examId),
    });
  }

  studentExamsHistory() {
    return this.http.get(environment.APIUrl + 'StudentHistory');
  }

  finishExam(examId: string, correctLists: any[]) {
    return this.http.post(environment.APIUrl + 'AnswersCorrection', {
      examId,
      correctLists,
    });
  }
}
