import { createRequestOption } from './../shared/util/request-util';
import { SERVER_API_URL } from './../app.constants';
import { INationalite } from './../shared/model/nationalite.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';




type EntityResponseType = HttpResponse<INationalite>;
type EntityArrayResponseType = HttpResponse<INationalite[]>;

@Injectable({ providedIn: 'root' })
export class NationaliteService {
  public resourceUrl = SERVER_API_URL + 'api/nationalites';

  constructor(protected http: HttpClient) {}

  create(nationalite: INationalite): Observable<EntityResponseType> {
    return this.http.post<INationalite>(this.resourceUrl, nationalite, { observe: 'response' });
  }

  update(nationalite: INationalite): Observable<EntityResponseType> {
    return this.http.put<INationalite>(this.resourceUrl, nationalite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INationalite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INationalite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
