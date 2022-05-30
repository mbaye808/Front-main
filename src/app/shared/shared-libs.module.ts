import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [FormsModule, CommonModule, NgbModule,  ReactiveFormsModule,FontAwesomeModule],
})
export class Jtest5SharedLibsModule {}
