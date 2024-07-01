import { UsersService } from './../../services/users-service.service';
import { Observable } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges, afterNextRender } from '@angular/core';
import { User } from '../../models/user';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NgIf,AsyncPipe, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges{
  @Input() user$!: Observable<User> | undefined;
  @Input() newUser!: boolean;
  @Input() action!: string;
  @Input() currentId!: string;

  userForm: any;

  PhoneNumber: RegExp =/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  constructor (
    private formBuilder: FormBuilder, 
    private _userService: UsersService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.populateForm();
  }

  populateForm(): void {
    if (this.user$ != undefined && !this.newUser){
      this.user$?.subscribe(res => {
        const newUser: User = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          phone: res.phone,
          role: res.role
        }
        
        this.userForm = this.formBuilder.group(newUser);
      })
    } else {
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(this.PhoneNumber)]],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  }

  save(): void {
    if (this.newUser){
      var newUser: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        role: 'user'
      }

      this._userService.createUser(newUser).subscribe();
    } else {

      var existingUser: User = {
        id: this.currentId,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        role: 'user'
      }

      this._userService.updateUser(this.currentId, existingUser).subscribe();
    }
  }

  delete(): void{
    this._userService.deleteUser(this.currentId).subscribe();
  }
}
