import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './signup/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(userData: User): void {
    this.http.post<User>('/api/users', userData).subscribe(
      (resData: User) => {
        console.log(resData);
        localStorage.setItem('user', JSON.stringify(resData));
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
