import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../../shared/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  registerForm = this.fb.group({
    fname: ['', Validators.minLength(3)],
    lname: ['', Validators.minLength(3)],
    uname: ['', Validators.minLength(3)],
    email: ['', Validators.email],
    password: ['', Validators.minLength(7)],
    cpassword: ['', Validators.minLength(7)]
  }, {validator: passwordValidator })
  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.Register(this.registerForm.value).subscribe(
      data=>{
        localStorage.setItem('token',data.token);
        this.router.navigate(['/home']);
      },
      err=>console.log(err)
    )
  }

}