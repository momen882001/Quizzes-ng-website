import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CreateExamService {
  constructor(
    private http: HttpClient,

  ) {}

  onCreateExam(title : string , questionCount : number , duration : Date , levelId : string) {
   return this.http.post( environment.APIUrl + 'CreateExam', {
    title,
    questionCount,
    duration,
    levelId
   })
  }
}
