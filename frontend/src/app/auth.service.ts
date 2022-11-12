import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl: string;
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.backendUrl = 'http://localhost:5000';
    } else {
      this.backendUrl = '';
    }
  }
  signUp(user: any) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backendUrl + '/api/auth/signup', user, {
      headers: options,
    });
  }
  login(user: any) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backendUrl + '/api/auth/login', user, {
      headers: options,
    });
  }
}
