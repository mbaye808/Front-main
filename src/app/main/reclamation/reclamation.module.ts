import { ReclamationComponent } from "./reclamation.component";

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jtest5SharedModule } from "app/shared/shared.module";
const routes = [
    {
        path     : 'reclamer',
        component: ReclamationComponent
    }
];

@NgModule({
    declarations: [
        ReclamationComponent,
    ],
    imports: [
        Jtest5SharedModule,
        RouterModule.forChild(routes),
    ],
    exports     : [
        ReclamationComponent
    ]
})

export class ReclamationModule
{
}
