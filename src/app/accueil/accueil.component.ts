import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
//import {fuseAnimations} from '../../../@fuse/animations';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  animations : fuseAnimations
})
export class AccueilComponent implements OnInit {
    modules?: any[] = [
        {
         'titre' :  'Gestion des Cours',
         'libelle' : 'Ce module contient tout ce qui est relatif aux cours'
        },
        {
            'titre' :  'Gestion des Absences',
            'libelle' : 'Ce module contient tout ce qui est relatif aux absences'
        },
        {
            'titre' :  'Gestion des bulletins',
            'libelle' : 'Ce module contient tout ce qui est relatif aux bulletins'
        },
        {
            'titre' :  'Gestion des Emplois du temps',
            'libelle' : 'Ce module contient tout ce qui est relatif aux emplois du temps'
        }
    ];

  constructor(
    private _fuseConfigService: FuseConfigService,
  ) {
    this._fuseConfigService.config = {
        layout: {
            navbar   : {
                hidden: true
            },
            toolbar  : {
                hidden: true
            },
            footer   : {
                hidden: false
            },
            sidepanel: {
                hidden: true
            }
        }
    };
  }

  ngOnInit(): void {
  }

}