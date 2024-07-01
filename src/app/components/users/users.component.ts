import { Component, afterNextRender } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../models/user';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent{

  users$!: Observable<User[]>;

  constructor(
    private _userService: UsersService
  ) {
    afterNextRender(() => {
      this.users$ = this.getUsers();
    })
  }

  getUsers(): Observable<User[]>{
    return this._userService.getUsers();
  }

}
