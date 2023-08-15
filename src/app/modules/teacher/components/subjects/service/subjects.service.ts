import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private http: HttpClient) {}

  addSubject(subject: string) {
    this.http.post('/api/subjects', subject).subscribe(
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
    return this.http.get('/api/subjects');
  }

  updateSubject(id: number, updatedsubject: string) {
    this.http.put(`/api/subjects/${id}`, updatedsubject).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteSubject(id: number) {
    this.http.delete(`/api/subjects/${id}`).subscribe(
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
