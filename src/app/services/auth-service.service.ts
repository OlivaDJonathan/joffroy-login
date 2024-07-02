import { AfterViewInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AfterViewInit{
  private baseUrl = 'https://localhost:44323';
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private _http: HttpClient) {}

  ngAfterViewInit(): void {
    if(this.isAuth()) {
      this._isLoggedIn.next(true)
    }
    
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/login`, { email, password })
    .pipe(map(response => {
      if (response && response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this._isLoggedIn.next(true);
      }
      return response;
    }))
  }
  
  register(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/register`, { email, password });
  }

  isAuth(): boolean {
    let token = this.getAuthToken();
    return token != undefined
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this._http.post<any>(`${this.baseUrl}/refresh`, {refreshToken});
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._isLoggedIn.next(false);
  }
}
