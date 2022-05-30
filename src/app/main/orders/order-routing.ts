import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommerceOrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path     : 'order',
    component: EcommerceOrdersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRouterModule { }
