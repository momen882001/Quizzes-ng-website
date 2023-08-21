import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private http: HttpClient) {}

  addSubject(subject: string) {
    return this.http.post(environment.APIUrl + 'CreateSubject', subject);
  }

  getSubjects() {
    return this.http.get(environment.APIUrl + 'ShowAllSubject');
  }

  updateSubject(id: string, updatedsubject: string) {
    return this.http.put(environment.APIUrl + 'EditSubject', {
      id: id,
      name: updatedsubject,
    });
  }

  deleteSubject(id: string) {
    return this.http.delete(environment.APIUrl + 'DeleteSubject', {
      params: new HttpParams().set('id', id),
    });
  }
}
