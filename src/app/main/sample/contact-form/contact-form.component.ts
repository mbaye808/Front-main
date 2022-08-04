import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IReclamation, Reclamation } from '../../../shared/model/reclamation.model';
import { ReclamationService } from '../../../service/reclamation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
@Component({
    selector     : 'contacts-contact-form-dialog',
    templateUrl  : './contact-form.component.html',
    styleUrls    : ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsContactFormDialogComponent implements OnInit
{
    enseignements = [
        
                'CC','TP','DS','RATTRAPAGE'
    ];
    action: string;
    
    contactForm: FormGroup;
    dialogTitle: string;
    reclamation:Reclamation;
    ec:any;
    isSaving:any;
    editForm = this._formBuilder.group({
       
        noteReclamation: [null, [Validators.required]],
        enseignement: [null, [Validators.required]],
       
      });
    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        protected reclamationService:ReclamationService
    )
    {
        // Set the defaults
        this.action = _data.action;

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
    ngOnInit() {
        this.enseignements=['CC','TP','DS','RATTRAPAGE'];
        console.log(this.enseignements);
    }
    updateForm(reclamation: IReclamation): void {
        this.editForm.patchValue({
         
          noteReclamation: reclamation.noteReclamation,
          historiqueElementContitutif: reclamation.historiqueElementContitutif
        });
      }
  /*   saveReclamation(message: string, action: string){
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
   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
   /*  private createContactForm(): IReclamation {
        return {
          ...new Reclamation(),
          noteReclamation: this.editForm.get(['noteReclamation'])!.value,
          enseignement: this.editForm.get(['enseignement'])!.value,
          date: moment(Date.now(),'YYYY-MM-DDTHH:mm'),
          historiqueElementContitutif: this.reclamation.historiqueElementContitutif,
          etat: this.reclamation.etat
        };
      } */
}
