# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Running the project

To run this project, make sure to have angular and node installed

Run `npm install` to update any necessary package

Change the `url` variables in both services to match your backend running locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Known Issues

When reloading the page after logging in, header buttons don't load correctly

There is only 1 interface/model for the whole project, should add more

Users page needs to be reloaded for it to show changes in the DB, which conflicts with the previous reloading page header issue. To logout, wait for the tokens to timeout, or change `<div class="user__logout" (click)="logout()" *ngIf="userLogged">Logout</div>` in the header.component.html to `<div class="user__logout" (click)="logout()" *ngIf="!userLogged">Logout</div>`.

Basically, invert the boolean that makes it show. Other than that, header works correctly if page isn't reloaded


