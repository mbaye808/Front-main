
import { MatConfirmDialogComponent } from "./mat-confirm-dialog.component";

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jtest5SharedModule } from "app/shared/shared.module";

const routes = [
    {
        path     : 'mat',
        component: MatConfirmDialogComponent
    }
];

@NgModule({
    declarations: [
        MatConfirmDialogComponent,
    ],
    imports: [
        Jtest5SharedModule,
        RouterModule.forChild(routes),
    ],
    exports     : [
        MatConfirmDialogComponent
    ]
})

export class MatConfirmDialogModule
{
}