import { FlexLayoutModule } from '@angular/flex-layout';
import { MailConfirmModule } from './shared/mail-confirm/mail-confirm.module';
import { RegisterModule } from './shared/register/register.module';
// import { ContactsModule } from './main/contacts/contacts.module';
import { MaterialModule } from './material.module';
import { Jtest5DemandeModule } from './main/demande/demande.module';

import { MatIconModule } from '@angular/material/icon'; 

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { TranslateModule } from '@ngx-translate/core';



import {LoginModule} from './shared/login/login.module';
import {HomeModule} from './main/home/home.module';
import {AccueilModule} from './accueil/accueil.module';
// import { EtudiantRoutingModule } from './main/etudiant/etudiant-routing.module';
// import {  Jtest5EtudiantModule } from './main/etudiant/etudiant.module';
import { DemandeRoutingModule } from './main/demande/demande-routing.module';
import { Jtest5CoreModule } from './core/core.module';
import { FuseModule } from '../@fuse/fuse.module';
import { FuseSharedModule } from '../@fuse/shared.module';



import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from './layout/layout.module';
import { SampleModule } from '././main/sample/sample.module';


import { CalendrierRoutingModule } from './main/calendar/calendrier-routing';
import { CalendarModule } from './main/calendar/calendar.module';
import { EcommerceModule } from './main/orders/orders.module';
import { EcommerceRouterModule } from './main/orders/order-routing';

 const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: ''
        
    },
    {
        path      : '**',
        redirectTo: 'home'
        
    },
    {
        path      : '**',
        redirectTo: 'log'
        
    },
   
    {
        path      : '**',
        redirectTo: 'register'
    },
    
    {
        path      : '**',
        redirectTo: 'bulletin'
    },
    {
        path      : '**',
        redirectTo: 'calendar'
    },
    {
        path      : '**',
        redirectTo: 'order'
    }
]; 

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // EtudiantRoutingModule,
        RouterModule.forRoot(appRoutes),
        DemandeRoutingModule,
        CalendrierRoutingModule,
        RouterModule,
        RegisterModule,
        TranslateModule.forRoot(),
        CalendarModule,
        // Material moment date module
        MatMomentDateModule,
        EcommerceRouterModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        // FontAwesomeModule, 
        // FaIconLibrary,
        // MatTableDataSource,
        MaterialModule,
        FuseModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,   
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule, 
        // ContactsModule, 
        FlexLayoutModule, 
        EcommerceModule,
        // App modules
        LayoutModule,
        SampleModule,
        // Jtest5EtudiantModule,
        Jtest5DemandeModule, 
        Jtest5CoreModule,
        LoginModule,
        HomeModule,
        AccueilModule,
        MailConfirmModule 
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
