import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay, DAYS_OF_WEEK } from 'angular-calendar';
import * as moment from 'moment';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { CalendarEventModel } from './event.model';
import { CalendarService } from './calendar.service';
import { fuseAnimations } from '../../../@fuse/animations';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { getHours } from 'date-fns/esm';
import { DatePipe } from '@angular/common';

moment.lang('fr');


@Component({
    selector     : 'calendar',
    templateUrl  : './calendar.component.html',
    styleUrls    : ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers:[
        {
            provide:CalendarDateFormatter,
            useClass:CustomDateFormatter
        }
    ]
}) 
export class CalendarComponent implements OnInit
{
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEvent[]=[];
  
    loading$ = this.loader.loading$;

    /* spinnerType:string;
    spinnerName:string; */
    selectedDay: any; 
    view: string;
    viewDate: Date;
    excludeDays : number[]=[0];
    weekStartsOn: number= DAYS_OF_WEEK.MONDAY
     
    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService,
        private cdr:ChangeDetectorRef,
        private datepipe:DatePipe,
        public loader: CalendarService,
    )
    
    {
        /* this.spinnerName = 'sp3';
        this.spinnerType = 'ball-spin-clockwise';
 */
        // Set the defaults
        this.view = 'week';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        
        /**
         * Get events from service/server
         */
        this.setEvents();

       /*  this.spinner.show(this.spinnerName);

        setTimeout(() => {
            this.spinner.hide(this.spinnerName);
        }, 5000); */
    } 
    setEvents(): void
    {
        // this.events = this._calendarService.events.map(item => {
        //     item.actions = this.actions;
        //     return new CalendarEventModel(item);
        // });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.emploiDuTp()
        /**
         * Watch re-render-refresh for updating db
         */

    }
    afficheedt():void{
        console.log(this.viewDate)
        console.log(this.datepipe.transform(this.viewDate,'yyyy-MM-dd'))
    }
    emploiDuTp(){
        
            this._calendarService.getEmploiDT(this.datepipe.transform(this.viewDate,'yyyy-MM-dd')).subscribe((data =>{
                data.body.forEach(element => {
                    this.events.push(this.Event(element))
                    console.log(this.events)
                    this.refresh();
                });
                console.log(data.body);
            }))
        
        
    }
    private refresh(): void {
        this.events = [...this.events];
        this.cdr.detectChanges();
      }     
Event(seance: any): any {
    let groupetp = '';
    let salle = '';
    let enseignant = '';

    if (seance.groupeTdTp !== null && seance.groupeTdTp !== undefined)
      groupetp = 'Groupe : ' + seance.groupeTdTp + '<br>';
    if (seance.salle) salle = 'Salle: ' + seance.salle + '<br>';
    if (seance.enseignant) enseignant = 'Enseignant: ' + seance.enseignant + '<br>';
    else if (seance.online === 'En ligne') enseignant = 'Cours: ' + seance.online;
    else if (seance.online === 'En ligne') salle = 'Cours: ' + seance.online;
    return {
      title:
        seance.historiqueEnseignement +
        '<br>'+
        seance.classe+
        '<br>'+
        seance.enseignant+
        '<br>'+
        groupetp+
        salle,
      id: seance.id,
      start: seance.heureDebut.toDate(),
      end: seance.heureFin.toDate(),
     

      meta: {

        texte: seance?.historiqueEnseignement + ' (' + seance.historiqueEnseignement + ')',
      },
    };
  }


    date(date: any) {
        throw new Error('Method not implemented.');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set events
     */
    

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({header, body}): void
    {
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if ( _selectedDay )
        {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }

    }

    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void
    {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if ( isSameMonth(date, this.viewDate) )
        {
            if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 )
            {
                this.activeDayIsOpen = false;
            }
            else
            {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh();
    }    
}


