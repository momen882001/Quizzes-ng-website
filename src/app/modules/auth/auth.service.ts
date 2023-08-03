import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './signup/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(signupData: User): void {
    this.http.post<User>('/api/users', signupData).subscribe(
      (resData: User) => {
        console.log(resData);
        if (resData.role === 'te') {
          this.router.navigate(['/teacher']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  Login(loginData: { email: string; password: string }): void {
    this.http.get<User[]>('/api/users').subscribe(
      (resData: User[]) => {
        resData.map((userData: User) => {
          if (
            userData.email === loginData.email &&
            userData.password === loginData.password
          ) {
            if (userData.role === 'ad') {
              this.router.navigate(['/admin']);
            } else if (userData.role === 'te') {
              this.router.navigate(['/teacher']);
            } else {
              alert('student');
            }
          } else {
            alert('You should sign up, this email doesnot exist');
          }
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
