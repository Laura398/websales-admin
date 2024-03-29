import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl: string = environment.api;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + '/users/login', { email: email, password: password });
  }
}
