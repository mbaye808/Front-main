import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {LoginComponent} from './login.component';


const routes = [
    {
        path     : 'log',
        component: LoginComponent
    }
];

@NgModule({

    imports     : [
        RouterModule.forChild(routes),
    ]
})
export class LoginModule
{
}
