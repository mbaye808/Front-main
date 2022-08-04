


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jtest5SharedModule } from "app/shared/shared.module";
import { UpdateComponent } from './update.component'

const routes = [
    {
        path     : 'update/:id',
        component: UpdateComponent
    }
];

@NgModule({
    declarations: [
        UpdateComponent,
    ],
    imports: [
        Jtest5SharedModule,
        RouterModule.forChild(routes),
    ],
    exports     : [
        UpdateComponent
    ]
})

export class UpdateModule
{
}