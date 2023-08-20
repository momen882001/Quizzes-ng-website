import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  constructor(private http: HttpClient, private router: Router) {}

  addLevel(subjectId: string, levelName: string) {
    this.http
      .post(environment.APIUrl + 'CreateLevel', {
        subjectId: subjectId,
        name: levelName,
      })
      .subscribe(
        (res) => {
          console.log(res);
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getLevels(subjectId: string) {
    return this.http.get(environment.APIUrl + 'ShowAllLevel/', {
      params: new HttpParams().set('SubjectId', subjectId),
    });
  }

  updateLevel(id: string, updatedlevel: string) {
    this.http
      .put(environment.APIUrl + 'EditLevel', {
        id: id,
        name: updatedlevel,
      })
      .subscribe(
        (res) => {
          console.log(res);
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteLevel(id: string) {
    this.http
      .delete(environment.APIUrl + 'DeleteLevel', {
        params: new HttpParams().set('id', id),
      })
      .subscribe(
        (res) => {
          console.log(res);
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
