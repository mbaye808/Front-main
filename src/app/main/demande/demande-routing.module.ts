import { DemandeUpdateComponent } from './demande-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande.component';


const routes: Routes = [
  {
    path     : 'demande',
    component: DemandeComponent
},
{
    path     : 'demande/new',
    component: DemandeUpdateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRoutingModule { }
