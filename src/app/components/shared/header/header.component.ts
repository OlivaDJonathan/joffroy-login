import { AsyncPipe, NgIf } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  userLogged : boolean = false;
  active : boolean = false;

  constructor(public _authService: AuthService, private router:Router) {
    this._authService.isLoggedIn$.subscribe(res => {
      this.userLogged = res;
    })
  }

  handleClick(event: Event) : void { 
    this.active = !this.active;
  }

  logout(): void {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
