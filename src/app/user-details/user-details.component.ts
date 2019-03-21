import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  error: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpClient: HttpClient
    ) {
      this._activatedRoute.params.subscribe(
        (params) => {
          this.getCurrentUser(params.userid);
        }
      );

    };

  getCurrentUser(userid: number) {
    this._httpClient.get<User>('http://localhost:3000/users/' + userid)
    .subscribe(
      resultat => {
        this.user = resultat;
      },
      (err: HttpErrorResponse) => {
        this.error = err.message;
      }
  }

  ngOnInit() {
  }

}
