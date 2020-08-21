import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req, next){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}