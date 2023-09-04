import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

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
    answersLists: { answer: string; isCorrect: boolean }[]
  ) {
    this.http
      .post(environment.APIUrl + 'CreateQuestion', {
        title,
        description,
        questions,
        skillName,
        levelId,
        answersLists,
      })
      .subscribe(
        (resData: any) => {
          console.log(resData);
          Swal.fire({
            icon: 'success',
            title : 'created successfully',
          })
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
