import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [loggedGuard] },
    { path: 'users', component: UsersComponent, canActivate: [authGuard] },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "**", redirectTo: "login", pathMatch: "full" }
];
