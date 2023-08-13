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
}
