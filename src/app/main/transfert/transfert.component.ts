

import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClasseService } from 'app/service/classe.service';
import { ReclamationService } from 'app/service/reclamation.service';
import { IClasse } from 'app/shared/model/classe.model';
import { Reclamation } from 'app/shared/model/reclamation.model';
import { JhiDataUtils, JhiEventWithContent, JhiFileLoadError } from 'ng-jhipster';
import { exit } from 'process';

@Component({
    selector   : 'transfert',
    templateUrl: './transfert.component.html',
    styleUrls  : ['./transfert.component.scss']
})
export class TransfertComponent implements OnInit
{

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

    reclamation = new Reclamation();

    transfertForm: FormGroup;

    fileName:string;
    nature:string;
  classe: IClasse;
  
  eventManager: any;

    constructor(private dataUtils:JhiDataUtils,
      private dialogRe: MatDialog, 
      private _formBuilder: FormBuilder, 
      private _service: ReclamationService, 
      private classeService : ClasseService, 
      private router: Router){}

ngOnDestroy(): void {
   
    }

ngOnInit(): void {

    this.transfertForm = this._formBuilder.group({

        nature: [
            '',
            [
              Validators.required,
              
            ],
            
          ],

          dateDebut: [
            '',
          ],

          dateFin: [
            '',
          ],

          description: [
            '',
            [
              Validators.required,
              
            ],
          ],

          photo: [
            '',
          ],
          etat: [
            '',
            
          ],
          photoContentType: [
            '',
            
          ],

    });

    this.classeService.getClasse().subscribe((res: HttpResponse<IClasse[]>) => {
      res.body.forEach(element => {
        if(element.specialite=='oui'){
          this.classe=element
          return;
        }
      });
    });            
}

private createReclamations(): Reclamation{
    return{
      ...new Reclamation(),
      id: null,
      nature: this.transfertForm.get(['nature'])!.value,
      description: this.transfertForm.get(['description'])!.value,
      groupe:this.classe,
      etat:"ENCOURS",
      photo: this.transfertForm.get(['photo'])!.value,
      photoContentType: this.transfertForm.get(['photoContentType'])!.value,
      dateDebut: this.transfertForm.get(['dateDebut'])!.value,
      dateFin: this.transfertForm.get(['dateFin'])!.value,
    }
  }

  reclames(){
    this.reclamation=this.createReclamations();
    this._service.reclamationFromRemote(this.reclamation).subscribe(
      data => {
        alert("votre réclamation est envoyée")
        this.router.navigate(['/order']);
  
    },
    error => {
      console.log("verifier vos informations");
  },)  
    
  }

 /*  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
    for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
      this.fileName = file.name +" is uploaded"
     
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }  
      this.uploadFiles();  
    };  
    fileUpload.click();  
}

private uploadFiles() {  
  this.fileUpload.nativeElement.value = '';  
  this.files.forEach(file => {  
    this.uploadFile(file);  
  });  
}

uploadFile(file) {  
  const formData = new FormData();  
  formData.append('file', file.data);  
  file.inProgress = true;  
  this._service.upload(formData).subscribe(
    rsp => {
      console.log(rsp.type)


     
},
    error => {
      console.log(error)
    });

}
 */

byteSize(base64String: string): string {
  return this.dataUtils.byteSize(base64String);
}

openFile(contentType: string, base64String: string): void {
  this.dataUtils.openFile(contentType, base64String);
}

setFileData(event: Event, field: string, isImage: boolean): void {
  this.dataUtils.loadFileToForm(event, this.transfertForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
    this.eventManager.broadcast(
      new JhiEventWithContent<any>('ebouclientApp.error', { ...err })
    );
  });
}

close(): void{

  this.dialogRe.closeAll();
}

}