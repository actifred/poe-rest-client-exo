import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  error: string;

  constructor(private _httpClient: HttpClient) { 
    this._refreshList();
  }

  private _refreshList() {
    this._httpClient.get<User[]>('http://localhost:3000/users')
    .subscribe(
      resultat => {
        this.users = resultat;
      },
      (err: HttpErrorResponse) => {
        this.error = err.message;
      }
    );
  }

  ngOnInit() {
  }

  deleteCard(idToRemove: number) {
    this._httpClient.delete('http://localhost:3000/users/' + idToRemove).subscribe(
      () => this._refreshList(),
      (err: HttpErrorResponse) => {
        this.error = err.message;
      } 
    );
  }

}
