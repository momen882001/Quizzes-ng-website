import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './signup/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {}

  signUp(signupData: User): void {
    this.http.post<User>(environment.APIUrl + 'Register', signupData).subscribe(
      (resData: any) => {
        this.message.create('success', 'Signed up successfully', {
          nzDuration: 3000,
        });
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  Login(UserName: string, Password: String): void {
    this.http
      .post(environment.APIUrl + 'Login', {
        UserName,
        Password,
      })
      .subscribe(
        (resData: any) => {
          localStorage.setItem('accessToken', resData.data.accessToken);
          localStorage.setItem('role', resData.data.roles[0]);
          this.message.create('success', 'Logined successfully', {
            nzDuration: 4000,
          });
          if (resData.data.roles[0] === 'Admin') {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/admin';
            this.router.navigateByUrl(returnUrl);
          } else if (resData.data.roles[0] === 'Teacher') {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/teacher';
            this.router.navigateByUrl(returnUrl);
          } else if (resData.data.roles[0] === 'User') {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/student';
            this.router.navigateByUrl(returnUrl);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  // using fake API

  // Login(loginData: { email: string; password: string }): void {
  //   this.http.get<User[]>('/api/users').subscribe(
  //     (resData: User[]) => {
  //       resData.map((userData: User) => {
  //         if (
  //           userData.email === loginData.email &&
  //           userData.password === loginData.password
  //         ) {
  //           this.user.next(userData);
  //           this.message.create('success', 'Logined successfully', {
  //             nzDuration: 4000,
  //           });
  //           if (userData.role === 'ad') {
  //             this.router.navigate(['/admin']);
  //           } else if (userData.role === 'te') {
  //             this.router.navigate(['/teacher']);
  //           } else if (userData.role === 'st') {
  //             this.router.navigate(['/student']);
  //           }
  //         } else if (userData.email !== loginData.email) {
  //           this.message.create('error', 'Your email is incorrect', {
  //             nzDuration: 4000,
  //           });
  //         } else if (userData.password !== loginData.password) {
  //           this.message.create('error', 'Your password is incorrect', {
  //             nzDuration: 4000,
  //           });
  //         }
  //       });
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
