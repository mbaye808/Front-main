import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


import { Login } from 'app/core/login/login.model';
import { SERVER_API_URL } from '../../app.constants';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<any> {
    return this.http
      .post<any>(SERVER_API_URL + 'loginAuth', credentials)
      .pipe(map(response => {this.authenticateSuccess(response, credentials.rememberMe)})); 
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: any, rememberMe: boolean): void {
    const jwt = response.token;
      this.$sessionStorage.store('authenticationToken', jwt);
      console.log( this.$sessionStorage.retrieve('authenticationToken'))
    
  }
}
