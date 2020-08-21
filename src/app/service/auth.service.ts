import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  Register(user) {
    return this.http.post<any>('api/register', user);
  }

  Login(user) {
    return this.http.post<any>('api/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
