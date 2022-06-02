import { fontAwesomeIcons } from './font-awesome-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import locale from '@angular/common/locales/en';

import * as moment from 'moment';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor } from 'app/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
        NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    ],
    providers: [
        Title,
        CookieService,
        {
            provide: LOCALE_ID,
            useValue: 'en',
        },
        DatePipe,
       /*  {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
        }, */
    ],
})
export class Jtest5CoreModule {
    constructor( dpConfig: NgbDatepickerConfig) {
        registerLocaleData(locale);
        // iconLibrary.addIcons(...fontAwesomeIcons);
        dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
