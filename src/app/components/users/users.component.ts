import { Component, afterNextRender } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../models/user';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [AsyncPipe, UserFormComponent]
})
export class UsersComponent{

  users$!: Observable<User[]>;
  user$!: Observable<User> | undefined;
  newUser: boolean = false;
  action: string = '';
  currentId: string = '';

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

  getUser(id: string) {
    this.user$ = this._userService.getUser(id);
    this.newUser = false;
    this.action = 'Update';
    this.currentId = id;
  }

  createNewUser(): void {
    this.newUser = true;
    this.user$ = undefined;
    this.action = 'Create';
    this.currentId = '';
  }

}
