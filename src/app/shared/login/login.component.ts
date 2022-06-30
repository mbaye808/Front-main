import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {LoginService} from '../../core/login/login.service';
import {Router} from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    @ViewChild('email', { static: false })
    email?: ElementRef;
    loginForm: FormGroup;
    authenticationError = false;
    

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param _loginService
     * @param _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _router: Router,
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email  : ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }
    login(): void {
        this._loginService
            .login({
                email: this.loginForm.get('email')!.value,
                password: this.loginForm.get('password')!.value,
                rememberMe: this.loginForm.get('rememberMe')!.value,

                
            })
            .subscribe(
                (res) => {
                    this.authenticationError = false;
                   
                     this._router.navigate(['/home']);
                    if (
                        this._router.url.startsWith('/account/register') ||
                        this._router.url.startsWith('/account/activate') ||
                        this._router.url.startsWith('/account/reset/')
                    ) {
                        this._router.navigate(['/cours']);
                    }
                },
                () => {(this.authenticationError = true)
                
                alert("Email ou mot de passe incorrectes");
                }
                
            );

    }

}
