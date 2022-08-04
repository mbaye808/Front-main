import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


import { createRequestOption } from 'app/shared/util/request-util';

import { SERVER_API_URL } from '../app.constants';
import { IReclamation, Reclamation } from '../shared/model/reclamation.model';
import { MatConfirmDialogComponent } from 'app/main/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from 'app/main/update/update.component';

type EntityResponseType = HttpResponse<IReclamation>;
type EntityArrayResponseType = HttpResponse<IReclamation[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationService {


  public resourceUrl = SERVER_API_URL + 'api/reclamations';

  SERVER_URL: string = "http://localhost:8080/fileUpload/upload";

  // private SERVER_URL2 = "http://localhost:8080/api/reclamations";

  private BASE_URL = "http://localhost:8080/api/reclamationsEtudiant";

  public resourceUrl2 = SERVER_API_URL + 'api/listeElementReclamationEtudiant/update';

  constructor(protected http: HttpClient, private dialogRes: MatDialog) {}

  public reclamationFromRemote(reclamation: Reclamation):Observable<any>{

    return this.http.post<any>(this.resourceUrl,reclamation)
  }

  getReclamationList(): Observable<EntityArrayResponseType>{
    
    return this.http.get<Reclamation[]>(`${this.resourceUrl}`,{  observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  create(reclamation: IReclamation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reclamation);
    return this.http
      .post<IReclamation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  public upload(formData){
    console.log("upload service function is called")
    console.log(formData);
    return this.http.post<FormData>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  update(reclamation: IReclamation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reclamation);
    return this.http
      .put<IReclamation>(this.resourceUrl2, copy, { observe: 'response' });
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

  /* delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  } */

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
  deleteReclamation(id:number): Observable<HttpResponse<{}>>{

    return this.http.delete(`${this.BASE_URL}/${id}`, { observe: 'response' });
}

openConfirmDialog(msg){
  return this.dialogRes.open(MatConfirmDialogComponent,{
     width: '390px',
     panelClass: 'confirm-dialog-container',
     disableClose: true,
     position: { top: "10px" },
     data :{
       message : msg
     }
   });
 }

 updateReclamation(id: number, reclamation: Reclamation): Observable<Object>{

  return this.http.put(`${this.resourceUrl}/${id}`, reclamation);
}

getReclamationById(id:number): Observable<Reclamation>{

  return this.http.get<Reclamation>(`${this.resourceUrl}/${id}`);
}
openDialogue(reclamation){
 const dialog= this.dialogRes.open(UpdateComponent, {
    height:'550px' ,
    width:'580px',
    maxHeight: '680px',
    position: { top: "10px" },
    disableClose: true
});
dialog.componentInstance.reclamation=reclamation
}
}
