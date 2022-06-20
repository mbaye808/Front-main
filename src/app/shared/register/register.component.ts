import { LOGIN_ALREADY_USED_TYPE, EMAIL_ALREADY_USED_TYPE } from './../constants/error.constants';

import { IEtudiant } from './../model/etudiant.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { JhiLanguageService } from 'ng-jhipster';

import { EtudiantService } from '../../service/etudiant.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RegisterService } from '../../service/register.service';
import { User } from 'app/core/user/user.model';
import { Router } from '@angular/router';



@Component({
    selector     : 'register',
    templateUrl  : './register.component.html',
    styleUrls    : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy
{
    user = new User();
    msg: String="";
    doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _service : RegisterService,
        private _router : Router,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private languageService: JhiLanguageService,
          
          private registerService: RegisterService,
          private fb: FormBuilder,
          private etudiantService: EtudiantService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
  ngOnDestroy(): void {
   
  }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
   ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            // ine           : ['', Validators.required],
            // nom           : ['', Validators.required],
            // prenom           : ['', Validators.required],
            // name           : ['', Validators.required],
            // email          : ['', [Validators.required, Validators.email]],
            // password       : ['', Validators.required],
            // passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
            /* login: [
                '',
                [
                  Validators.required,
                  Validators.minLength(1),
                  Validators.maxLength(50),
                  Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
                ],
              ], */
              dateNaiss: [
                '',
                [
                  Validators.required,
                  Validators.minLength(1),
                  Validators.maxLength(50),
                  Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
                ],
              ],
                firstName: [
                    '',
                    [
                      Validators.required,
                      Validators.minLength(1),
                      Validators.maxLength(50),
                      Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
                    ],
                  ],
                  lastName: [
                            '',
                            [
                              Validators.required,
                              Validators.minLength(1),
                              Validators.maxLength(50),
                              Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
                            ],
                          ],
                  ine: [
                                    '',
                                    [
                                      Validators.required,
                                      Validators.minLength(1),
                                      Validators.maxLength(50),
                                      Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
                                    ],
                        ],
          
              email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
              password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
              confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
            
        });
        
      
      
    /**
     * On destroy
     */
   
} 
private createUser(): User{
  return{
    ...new User(),
    id: null,
    // username: this.registerForm.get(['login'])!.value,
    firstName: this.registerForm.get(['firstName'])!.value,
    lastName: this.registerForm.get(['lastName'])!.value,
    ine: this.registerForm.get(['ine'])!.value,
    email: this.registerForm.get(['email'])!.value,
    password: this.registerForm.get(['password'])!.value,
    dateNaiss: this.registerForm.get(['dateNaiss'])!.value,
  }
}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
register(){
  this.user=this.createUser();
  this._service.registerUserFromRemote(this.user).subscribe(
    data => {
    alert("Compte créé avec succés");
  },
  error => {
    alert("echec, verifier vos information");
  this.msg=error.error;
})//()=>  this._router.navigate(['/log']))  
  
}

}