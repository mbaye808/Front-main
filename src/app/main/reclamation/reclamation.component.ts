import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReclamationService } from 'app/service/reclamation.service';
import { Reclamation } from 'app/shared/model/reclamation.model';

@Component({
    selector   : 'reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls  : ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit
{

    reclamation = new Reclamation();

    reclamationForm: FormGroup;

    constructor(private dialogRe: MatDialog, private _formBuilder: FormBuilder, private _service: ReclamationService, private _router : Router){}

ngOnDestroy(): void {
   
    }

ngOnInit(): void {

    this.reclamationForm = this._formBuilder.group({

        typeReclamation: [
            '',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(50),
              Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
            ],
          ],

          etat: [
            '',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(50),
              Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
            ],
          ],

          description: [
            '',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(50),
              Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
            ],
          ],


    });
}

private createReclamation(): Reclamation{
    return{
      ...new Reclamation(),
      id: null,
      typeReclamation: this.reclamationForm.get(['typeReclamation'])!.value,
      description: this.reclamationForm.get(['description'])!.value,
      etat: this.reclamationForm.get(['etat'])!.value,
    }
  }

  reclame(){
    this.reclamation=this.createReclamation();
    this._service.reclamationFromRemote(this.reclamation).subscribe(
      data => {
        alert("votre réclamation est envoyée")
  
    },
    error => {
      console.log("verifier vos informations");
  },()=>  this._router.navigate(['/cours']))  
    
  }

}