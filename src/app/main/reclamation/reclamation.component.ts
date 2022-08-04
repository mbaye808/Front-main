import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReclamationService } from 'app/service/reclamation.service';
import { Reclamation } from 'app/shared/model/reclamation.model';
import * as moment from 'moment';

@Component({
    selector   : 'reclamation',
    templateUrl: './reclamation.component.html',
    styleUrls  : ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit
{

    reclamation = new Reclamation();

    reclamationForm: FormGroup;
    session:any;
    semestre:any
    historiqueElementContitutif: any;
    classe: import("c:/Users/IBRAHIMA DABO/Desktop/sec-service/Front-main/src/app/shared/model/classe.model").Classe;
    //date =new Date(Date.now());

    constructor(private dialogRe: MatDialog, private _formBuilder: FormBuilder, private _service: ReclamationService, private _router : Router){}

ngOnDestroy(): void {
   
    }

ngOnInit(): void {

    this.reclamationForm = this._formBuilder.group({

        typeReclamation: [
            '',
            [
              Validators.required,
            ],
          ],

          etat: [
            '',
          ],

          description: [
            '',
            [
              Validators.required,
            ],
          ],
    });
}

private createReclamation(): Reclamation{
    return{
      ...new Reclamation(),
      id: null,
      typeReclamation: this.reclamationForm.get(['typeReclamation'])!.value,
      nature:"note",
      session:this.session,
      semestre:this.semestre,
      groupe:this.classe,
      historiqueElementContitutif:this.historiqueElementContitutif,
      description: this.reclamationForm.get(['description'])!.value,
      etat: "ENCOURS",
    }
  }

  reclame(){
    this.reclamation=this.createReclamation();
    this._service.reclamationFromRemote(this.reclamation).subscribe(
      data => {
        alert("votre réclamation est envoyée")
        this._router.navigate(['/cours']);
  
    },
    error => {
      console.log("verifier vos informations");
  },()=>  this._router.navigate(['/cours']))  
    
  }

  closes(): void{

    this.dialogRe.closeAll();
  
  }

}