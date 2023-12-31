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

  studentExamsHistory(pageSize: number, pageNumber: number) {
    return this.http.get(environment.APIUrl + 'StudentHistory', {
      params: new HttpParams()
        .set('PageNumber', pageNumber)
        .set('PageSize', pageSize),
    });
  }

  finishExam(examId: string, correctLists: any[]) {
    return this.http.post(environment.APIUrl + 'AnswersCorrection', {
      examId,
      correctLists,
    });
  }

  getExamQuestionsDetails(examId: string, examDate: string) {
    return this.http.get(environment.APIUrl + 'StudentQuestionsHistory', {
      params: new HttpParams().set('ExamId', examId).set('ExamDate', examDate),
    });
  }
}
