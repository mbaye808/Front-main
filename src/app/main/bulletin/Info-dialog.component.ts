import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Inscription } from './../../shared/model/inscription.model';
import { Semestre } from './../../shared/model/semestre.model';
import { Note } from './../../shared/model/note.model';

 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { ActivatedRoute } from '@angular/router';

import { AnyARecord } from 'dns';
 

 @Component({
     selector: 'info-dialog',
     templateUrl: './Info-dialog-component.html',
     //styleUrls: ['./decision-annuel.component1.css']
 })
 export class InfoDialogComponent implements OnInit {
     
     notes:Note[];
     notes2:Note[];
     okey:boolean = false;
     semestre:any
    semestres:Semestre[]
    inscription: Inscription;
    Inscriptions: Inscription[]
    session: any
    sessions: any
     constructor(
         public activeModal: NgbActiveModal,
        
     ) {
     }

     ngOnInit() {

     }

    }