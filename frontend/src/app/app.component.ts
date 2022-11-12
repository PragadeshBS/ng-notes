import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  constructor(private router: Router) {}
  title = 'todo';
  userLoggedIn: boolean = false;

  ngDoCheck() {
    if (localStorage.getItem('user')) this.userLoggedIn = true;
    else this.userLoggedIn = false;
  }

  onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  onProfile() {
    this.router.navigate(['/profile']);
  }
}
