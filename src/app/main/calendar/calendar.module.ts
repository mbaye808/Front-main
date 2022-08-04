import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';


registerLocaleData(localeFr);
@NgModule({
    declarations   : [
        CalendarComponent
    ],
    imports        : [ 
        // RouterModule.forChild(routes),

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatTooltipModule, 
        AngularCalendarModule.forRoot({
            provide   : DateAdapter,
            useFactory: adapterFactory
        }),
        ColorPickerModule,

        FuseSharedModule,
        FuseConfirmDialogModule
    ],
    providers      : [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlerInterceptor,
        multi: true
        
    },
        
        CalendarService,

    ],
})
export class CalendarModule
{
}
