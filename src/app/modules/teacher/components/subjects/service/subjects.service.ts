import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private http: HttpClient) {}

  addSubject(subject: string) {
    this.http.post(environment.APIUrl + 'CreateSubject', subject).subscribe(
      (res: any) => {
        console.log(res);
        window.location.reload();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getSubjects() {
    return this.http.get(environment.APIUrl + 'ShowAllSubject');
  }

  updateSubject(id: string, updatedsubject: string) {
    this.http
      .put(environment.APIUrl + 'EditSubject', {
        id: id,
        name: updatedsubject,
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

  deleteSubject(id: string) {
    this.http
      .delete(environment.APIUrl + 'DeleteSubject', {
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
