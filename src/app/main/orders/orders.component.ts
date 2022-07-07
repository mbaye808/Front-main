import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';


import { takeUntil } from 'rxjs/operators';
import { Reclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from 'app/service/reclamation.service';

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

    constructor(private reclamationService: ReclamationService){}

    ngOnDestroy(): void {
        
    }
    ngOnInit(): void {

        this.getReclamation();
        
    }
   private getReclamation(){
    this.reclamationService.getReclamationList().subscribe(data =>{
      this.reclamation = data;
    })
  }
}
