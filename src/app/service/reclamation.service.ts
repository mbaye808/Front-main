import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


import { createRequestOption } from 'app/shared/util/request-util';

import { SERVER_API_URL } from '../app.constants';
import { IReclamation } from '../shared/model/reclamation.model';

type EntityResponseType = HttpResponse<IReclamation>;
type EntityArrayResponseType = HttpResponse<IReclamation[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  public resourceUrl = SERVER_API_URL + 'api/reclamations';

  constructor(protected http: HttpClient) {}

  create(reclamation: IReclamation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reclamation);
    return this.http
      .post<IReclamation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reclamation: IReclamation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reclamation);
    return this.http
      .put<IReclamation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReclamation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReclamation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reclamation: IReclamation): IReclamation {
    const copy: IReclamation = Object.assign({}, reclamation, {
      date: reclamation.date && reclamation.date.isValid() ? reclamation.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reclamation: IReclamation) => {
        reclamation.date = reclamation.date ? moment(reclamation.date) : undefined;
      });
    }
    return res;
  }
}
