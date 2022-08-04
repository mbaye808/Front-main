
import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'app/service/classe.service';
import { ReclamationService } from 'app/service/reclamation.service';
import { IClasse } from 'app/shared/model/classe.model';
import { Reclamation } from 'app/shared/model/reclamation.model';
import { JhiDataUtils, JhiEventWithContent, JhiFileLoadError } from 'ng-jhipster';
import { TransfertComponent } from '../transfert/transfert.component';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

  reclamation: Reclamation ;
  eventManager: any;
  id: number;
  transfertForm: FormGroup;

    fileName:string;
    nature:string;
  classe: IClasse;


  constructor(private reclamationService: ReclamationService,
   private route: ActivatedRoute,
   private router: Router,
   private dataUtils:JhiDataUtils,
   private dialogRe: MatDialog, 
   private _formBuilder: FormBuilder, 
   private classeService : ClasseService) { }

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
    console.log(this.reclamation)
    if(this.reclamation){
      this.transfertForm.patchValue({
        nature:this.reclamation.nature,
        description:this.reclamation.description,
        dateDebut:this.reclamation.dateDebut,
        dateFin:this.reclamation.dateFin,
        photo:this.reclamation.photo,
        photoContentType:this.reclamation.photoContentType,
        etat:this.reclamation.etat,

      })
    }

  }
  private createReclamations(): Reclamation{
    return{
      ...new Reclamation(),
      id: this.reclamation.id,
      nature: this.transfertForm.get(['nature'])!.value,
      description: this.transfertForm.get(['description'])!.value,
      historiqueElementContitutif:this.reclamation.historiqueElementContitutif,
      ine:this.reclamation.ine,
      semestre:this.reclamation.semestre,
      session:this.reclamation.session,
      typeReclamation:this.reclamation.typeReclamation,

      groupe:this.classe,
      etat: "ENCOURS",
      photo: this.transfertForm.get(['photo'])!.value,
      photoContentType: this.transfertForm.get(['photoContentType'])!.value,
      date:this.reclamation.date,
      anneeAccademique:this.reclamation.anneeAccademique,
      dateDebut: this.transfertForm.get(['dateDebut'])!.value,
      dateFin: this.transfertForm.get(['dateFin'])!.value,
    }
  }

  
  onSubmit(){
    this.reclamation=this.createReclamations();
    this.reclamationService.update( this.reclamation).subscribe(data =>{
      
      this.close()
    },);
    
  }



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