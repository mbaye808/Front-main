import { DATE_FORMAT } from './../shared/constants/input.constants';
import { IUser, User } from './../core/user/user.model';
import { IEtudiant } from './../shared/model/etudiant.model';
// import { RegisterService } from './register.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';

import { map } from 'rxjs/operators';
import { SERVER_API_URL } from '../app.constants';
type EntityResponseType = HttpResponse<IEtudiant>;
type EntityArrayResponseType = HttpResponse<IEtudiant[]>;

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor( private _http : HttpClient) {}

  public registerUserFromRemote(user: User):Observable<any>{

    return this._http.post<any>("http://localhost:8080/register",user)
    
  
  }
   protected convertDateFromClient(etudiant: IEtudiant): IEtudiant {
    const copy: IEtudiant = Object.assign({}, etudiant, {
      dateNaissance: etudiant.dateNaissance && etudiant.dateNaissance.isValid() ? etudiant.dateNaissance.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }
  
}

