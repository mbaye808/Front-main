import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';


import { takeUntil } from 'rxjs/operators';
import { IReclamation, Reclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from 'app/service/reclamation.service';
import { TransfertComponent } from '../transfert/transfert.component';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector   : 'ecommerce-orders',
    templateUrl: './orders.component.html',
    styleUrls    : ['./orders.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceOrdersComponent implements OnInit, OnDestroy
{
    reclamation: Reclamation[];

    orderForm: FormGroup;

    isSaving:any;

    constructor(private reclamationService: ReclamationService,  private _snackBar: MatSnackBar, private dialogRes: MatDialog,
       private _formBuilder: FormBuilder,  private router: Router){}

    ngOnDestroy(): void {
        
    }
    previousState(): void {
      window.history.back();
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReclamation>>): void {
      result.subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
    protected onSaveSuccess(): void {
      this.isSaving = false;
      this.previousState();
    }
  
    protected onSaveError(): void {
      this.isSaving = false;
    }
    ngOnInit(): void {

        this.getReclamation();

        this.orderForm = this._formBuilder.group({

          etat: [
              '',
              [
                Validators.required,
              ],
              ],
        
    });
    }
  private getReclamation(){
    this.reclamationService.getReclamationList().subscribe(data =>{
      this.reclamation = data.body;
    }) 
  }
  openDialogue(){
    this.dialogRes.open(TransfertComponent, {
      height:'550px' ,
      width:'580px',
      maxHeight: '680px',
      position: { top: "10px" },
      disableClose: true
  });
  }
  deleteReclamation(id:any){
   const dialog= this.reclamationService.openConfirmDialog('Êtes-vous sûr de vouloir supprimer cette réclamation ?')
    
   dialog.beforeClosed().subscribe(res =>{
    
      if(res){
        console.log(res);
        console.log(res);
        this.reclamationService.deleteReclamation(id.id).subscribe((res)=>{
          this.getReclamation()
        })
         
      }
    });
  }
  private createContactForm(): IReclamation {
    return {
      ...new Reclamation(),
      etat: this.orderForm.get(['etat'])!.value,
    };
  }
  /* saveReclamation(message: string, action: string){
    this.isSaving = true;
    const reclamation = this.createContactForm();
    if (reclamation.id !== undefined) {
      this.subscribeToSaveResponse(this.reclamationService.update(reclamation));
    } else {
      this.subscribeToSaveResponse(this.reclamationService.create(reclamation));
    }
    this._snackBar.open(message, action, {
      duration: 2000,
    });
    console.log(reclamation);
} */

updateReclamation(id){

  const dialog= this.reclamationService.openDialogue(id); 

}
}
