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
    this.token =
      localStorage.getItem('accessToken') !== null
        ? localStorage.getItem('accessToken')
        : null;
    this.isLogined =
      localStorage.getItem('accessToken') !== null ? true : false;
    //  this.authService.user.subscribe((token) => {
    //   this.isLogined =
    //     !token || localStorage.getItem('accessToken') === null ? false : true;
    // });
    // this.isLogined = localStorage.getItem('accessToken') ? true : false;
    // this.authService.autoLogin();
  }

  onNavigateSignUp() {
    this.router.navigate(['/signup']);
  }

  onLogout() {
    if (localStorage.getItem('accessToken') !== null) {
      localStorage.removeItem('accessToken');
      if (localStorage.getItem('accessToken') == null) {
        this.router.navigate(['/login']);
      }
    }
  }

  onNavigateLogin() {
    this.router.navigate(['/login']);
  }
}
