
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniComponent } from './alumni.component';

import { FuseSharedModule } from '@fuse/shared.module';
@NgModule({
  declarations: [AlumniComponent],
  imports: [
    CommonModule,
    AlumniRoutingModule,
    FuseSharedModule,
    // Jtest5SemestreModule
  ]
})
export class AlumniModule { }