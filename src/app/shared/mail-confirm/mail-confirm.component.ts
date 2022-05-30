import { flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ActivateService } from './../../service/activate.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'mail-confirm',
    templateUrl  : './mail-confirm.component.html',
    styleUrls    : ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailConfirmComponent implements OnInit {
    


    error = false;
  success = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,private activateService: ActivateService,private route: ActivatedRoute) 
        {
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
        ngOnInit(): void {
            this.route.queryParams.pipe(flatMap(params => this.activateService.get(params.key))).subscribe(
              () => (this.success = true),
              () => (this.error = true)
            );
          }
        
        // Configure the layout
        
    }
    



