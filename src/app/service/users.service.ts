import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  public getListUsers() {
    return this.http.get<User[]>('http://localhost:3000/api/users');
  }

  public modifierUser(user: User) {
    return this.http.put('http://localhost:3000/api/users', user);
  }

  public deleteUser(user: User) {
    return this.http.delete('http://localhost:3000/api/users/' + user._id);
  }
}
