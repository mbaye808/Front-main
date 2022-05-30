import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Jtest5SharedLibsModule } from './shared-libs.module';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

import { RouterModule } from '@angular/router';
import {FuseSharedModule} from '../../@fuse/shared.module';
import { MaterialModule } from '../material.module';
@NgModule({
    imports: [Jtest5SharedLibsModule, MaterialModule, RouterModule, FuseSharedModule],
  declarations: [ LoginComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginComponent],
  exports: [Jtest5SharedLibsModule, LoginComponent, HasAnyAuthorityDirective, MaterialModule],
})
export class Jtest5SharedModule {}
