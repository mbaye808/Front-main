import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


import { Login } from 'app/core/login/login.model';
import { SERVER_API_URL } from '../../app.constants';
import { Router } from '@angular/router';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private _router: Router, private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationtoken') || this.$sessionStorage.retrieve('authenticationtoken') || '';
  }

  login(credentials: Login): Observable<any> {
    return this.http
      .post<any>(SERVER_API_URL + 'loginAuth', credentials)
      .pipe(map(response => {this.authenticateSuccess(response, credentials.rememberMe)})); 
      
  }
  logout(): Observable<void> {
    this.$localStorage.clear('authenticationtoken');
    this.$sessionStorage.clear('authenticationtoken');
    return new Observable(observer => {
      this.$localStorage.clear('authenticationtoken');
      this.$sessionStorage.clear('authenticationtoken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: any, rememberMe: boolean): void {
    const jwt = response.token;
    this.$localStorage.store('authenticationtoken', jwt);
      this.$sessionStorage.store('authenticationtoken', jwt);
      console.log( this.$sessionStorage.retrieve('authenticationtoken'))
    
  }
}
