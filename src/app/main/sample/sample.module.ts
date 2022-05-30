import { Jtest5SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { ContactsContactFormDialogComponent } from './contact-form/contact-form.component';


const routes = [
    {
        path     : 'cours',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent,
        ContactsContactFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        Jtest5SharedModule,


    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
