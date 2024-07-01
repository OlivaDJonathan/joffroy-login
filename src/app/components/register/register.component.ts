import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  StrongPasswordRegx: RegExp =/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  PhoneNumber: RegExp =/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  userForm: any;

  active : boolean = true;

  constructor(
    private formBuilder: FormBuilder, 
    private _authService: AuthService,
    private _userService: UsersService
  ) {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.PhoneNumber)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]]
    });
  }

  register() {
    //TODO Login submition
    if (this.userForm?.valid) {
      this._authService.register(this.userForm.value.email, this.userForm.value.password).subscribe();
      
      var newUser: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        role: 'user'
      }

      this._userService.createUser(newUser).subscribe();
    }
  }
}
