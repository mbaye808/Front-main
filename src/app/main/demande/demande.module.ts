import { Jtest5SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { DemandeComponent } from './demande.component';
import { DemandeUpdateComponent } from './demande-update.component';
import { DemandeDeleteDialogComponent } from './demande-delete-dialog.component';
import { DemandeDetailComponent } from './demande-detail.component';



@NgModule({
  imports: [Jtest5SharedModule],
  declarations: [DemandeComponent, DemandeDetailComponent, DemandeUpdateComponent, DemandeDeleteDialogComponent],
  entryComponents: [DemandeDeleteDialogComponent],
})
export class Jtest5DemandeModule {}
