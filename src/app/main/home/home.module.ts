// import { Jtest5SemestreModule } from './../../entities/semestre/semestre.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { FuseSharedModule } from '@fuse/shared.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FuseSharedModule,
    // Jtest5SemestreModule
  ]
})
export class HomeModule { }
