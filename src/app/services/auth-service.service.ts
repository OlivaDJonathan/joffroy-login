import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'https://localhost:44323'

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/login`, { username, password })
    .pipe(map(response => {
      if (response && response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      return response;
    }))
  }
  
  register(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/register`, { username, password });
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
  }
}
