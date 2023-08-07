import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onNavigateSignUp() {
    this.router.navigate(['/signup']);
  }

  onNavigateLogin() {
    this.router.navigate(['/login']);
  }
}
