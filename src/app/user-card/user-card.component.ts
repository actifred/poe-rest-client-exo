import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  @Output() deleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  askDeletion() {
    this.deleteEvent.emit(this.user.id);
  }

}
