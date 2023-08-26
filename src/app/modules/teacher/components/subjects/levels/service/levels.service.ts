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
    return this.http.post(environment.APIUrl + 'CreateLevel', {
      subjectId: subjectId,
      name: levelName,
    });
  }

  getLevels(subjectId: string) {
    return this.http.get(environment.APIUrl + 'GetAllLevels/', {
      params: new HttpParams().set('SubjectId', subjectId),
    });
  }

  updateLevel(id: string, updatedlevel: string) {
    return this.http.put(environment.APIUrl + 'EditLevel', {
      id: id,
      name: updatedlevel,
    });
  }

  deleteLevel(id: string) {
    return this.http.delete(environment.APIUrl + 'DeleteLevel', {
      params: new HttpParams().set('id', id),
    });
  }
}
