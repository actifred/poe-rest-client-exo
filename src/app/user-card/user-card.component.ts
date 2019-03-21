import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  @Output() deleteEvent = new EventEmitter();

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  askDeletion() {
    this.deleteEvent.emit(this.user.id);
  }

  goToDetails() {
    this._router.navigate([ '/users', this.user.id ]);
  }

}
