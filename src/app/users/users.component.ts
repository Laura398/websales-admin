import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { User } from '../interface';
import { ModifierUserComponent } from '../modify-user/modifier-user.component';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  [x: string]: any;

  UrlUsers: string = environment.api + '/users';

  listUsers: Array<User> = [];
  dataSource = [{}];

  @ViewChild(MatTable) table: MatTable<any> | any;

  COLUMN_LASTNAME = 'lastName';
  COLUMN_FIRSTNAME = 'firstName';
  COLUMN_EMAIL = 'email';
  COLUMN_DELETE = 'delete';

  displayedColumns: string[] = [
    this.COLUMN_LASTNAME,
    this.COLUMN_FIRSTNAME,
    this.COLUMN_EMAIL,
    this.COLUMN_DELETE
  ]

  status: any;

  lastName(user: User): string {
    return user.lastName;
  }
  firstName(user: User): string {
    return user.firstName;
  }
  email(user: User): string {
    return user.email;
  }

  constructor(private usersService: UsersService, private http: HttpClient, public dialog: MatDialog) {
    this.getUser();
  }

  getUser(){
    this.http.get<User>(this.UrlUsers).subscribe(data => {
      this.listUsers = JSON.parse(JSON.stringify(data));

      this.dataSource = this.listUsers;
    });
  }


  ngOnInit(): void {
  }

  openDialog(element:User): void {    
    const dialogRef = this.dialog.open(ModifierUserComponent, {
      width: '300px',
      data: {lastName: element.lastName, firstName: element.firstName, email: element.email},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.patch(this.UrlUsers + '/' + element._id, result).subscribe(data => {
        this.listUsers = JSON.parse(JSON.stringify(data));
        
        this.dataSource = this.listUsers;
        this.getUser();
      });
    });
  }

  alert(element: User): void {    
    this.http.delete(this.UrlUsers + '/' + element._id).subscribe(() => {
      this.getUser();
    }, 
    (err) => {
      console.log(err);
    });
    alert('Vous avez supprimé l\'utilisateur ');
  }
}

