import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.minLength(7)],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.auth.Login(this.loginForm.value).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
