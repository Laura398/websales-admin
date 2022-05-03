import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit(): void {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  tokenInfo = {
    isAdmin: false
  };

  login(){
    this.authService.login(this.email.value, this.password.value).subscribe((res)=>{
      this.tokenInfo = this.getDecodedAccessToken(JSON.parse(JSON.stringify(res)).token);
      if(!this.tokenInfo.isAdmin){
        alert('You are not an admin');
        return
      };
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
      }

      localStorage.setItem('token', JSON.parse(JSON.stringify(res)).token);
      this.router.navigate(['/nav']);
  }, (err) => {
    alert('Wrong email or password');
    return err;
  }
  );
  }
}
