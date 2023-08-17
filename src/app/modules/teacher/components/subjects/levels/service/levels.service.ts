import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  constructor(private http: HttpClient) {}

  addLevel(subjectId: number, levelName: string) {
    this.http
      .put(`/api/subjects/${subjectId}`, {
        levels: [levelName],
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getLevels(subjectId: number) {
    return this.http.get(`/api/subjects/${subjectId}`);
  }

  updateLevel(id: number, updatedlevel: string) {
    this.http.put(`/api/subjects/${id}`, updatedlevel).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteLevel(id: number) {
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
