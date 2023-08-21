import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  isLogined: boolean = false;
  token!: string | null;

  ngOnInit(): void {
    // this.token = localStorage.getItem('accessToken') !== null ? localStorage.getItem('accessToken') : null;
    // this.isLogined = localStorage.getItem('accessToken') !== null ? true : false;
    //  this.authService.user.subscribe((token) => {
    //   this.isLogined =
    //     !token || localStorage.getItem('accessToken') === null ? false : true;
    // });
    this.isLogined = localStorage.getItem('accessToken') ? true : false;
    this.authService.autoLogin();
  }

  onNavigateSignUp() {
    this.router.navigate(['/signup']);
  }

  onLogout() {
    localStorage.removeItem('accessToken');
    // this.router.navigate(['/login']);
    // this.authService.user.subscribe( token => {
    //   if (!token) {
    //     localStorage.removeItem('accessToken')
    //   }
    // })
  }

  onNavigateLogin() {
    this.router.navigate(['/login']);
  }
}
