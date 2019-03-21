import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  error: string;
  private _routeSub: Subscription;
  formulaire;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpClient: HttpClient,
    private _router: Router,
    private _fb: FormBuilder
    ) {
      this._routeSub = this._activatedRoute.params.subscribe(
        (params) => {
          this._getCurrentUser(params.userid);
        }
      );

    };

  private _initForm() {
    this.formulaire = this._fb.group({
      firstname: this._fb.control(this.user.firstname ),
      lastname: this._fb.control(this.user.lastname ),
      email: this._fb.control(this.user.email ),
      avatar: this._fb.control(this.user.avatar )
    });
  }

  private _getCurrentUser(userid: number) {
    this._httpClient.get<User>('http://localhost:3000/users/' + userid)
    .subscribe(
      resultat => {
        this.user = resultat;
        this._initForm();
      },
      (err: HttpErrorResponse) => {
        this.error = err.message;
      }
    )
  }

  modifieUtilisateur() {
    this.user.firstname = this.formulaire.get('firstname').value;
    this.user.lastname = this.formulaire.get('lastname').value;
    this.user.email = this.formulaire.get('email').value;
    this.user.avatar = this.formulaire.get('avatar').value;

    this._httpClient.put<User>('http://localhost:3000/users/' + this.user.id, this.user)
    .subscribe(
      resultat => {
        this._router.navigateByUrl('/users');
      },
      (err: HttpErrorResponse) => {
        this.error = err.message;
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }

}
