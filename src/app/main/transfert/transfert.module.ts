

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransfertComponent } from './transfert.component';
import { Jtest5SharedModule } from "app/shared/shared.module";

const routes = [
    {
        path     : 'transfert',
        component: TransfertComponent
    }
];

@NgModule({
    declarations: [
        TransfertComponent,
    ],
    imports: [
        Jtest5SharedModule,
        RouterModule.forChild(routes),
    ],
    exports     : [
        TransfertComponent
    ]
})

export class TransfertModule
{
}