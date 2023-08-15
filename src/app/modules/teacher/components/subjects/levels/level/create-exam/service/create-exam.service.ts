import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateExamService {
  constructor(
    private http: HttpClient,

  ) {}

  onCreateExam(examData: { title: string; time: number; noQuestions: number }) {
   return this.http.post('/api/exams', examData)
  }
}
