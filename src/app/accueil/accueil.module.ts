import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil.component';

import { FuseSharedModule } from '@fuse/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AccueilComponent],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    FuseSharedModule,
    // Jtest5SemestreModule
  ]
})
export class AccueilModule { }
