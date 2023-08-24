import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // if (localStorage.getItem('accessToken') !== null) {
    //   if (localStorage.getItem('role') === 'Teacher') {
    //     this.router.navigate(['/teacher']);
    //   } else if (localStorage.getItem('role') === 'User') {
    //     this.router.navigate(['/student']);
    //   }
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}
