import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class CalendarService implements Resolve<any>
{
    private baseURL = "http://localhost:8080/api/seances/findByNiveau";
    events: any;
    onEventsUpdated: Subject<any>;

    private _loading = new BehaviorSubject<boolean>(false);

    public readonly loading$ = this._loading.asObservable();

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }
    show(){
        this._loading.next(true);
    }
    hide(){
        this._loading.next(false);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                  
                },
                reject
            );
        });
    }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/calendar/events')
                .subscribe((response: any) => {
                    this.events = response.data;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar/events', {
                id  : 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }
    getEmploiDT(date: any): Observable<HttpResponse<any[]>> {
            console.log(date)
            return this._httpClient.get<any[]>(`${this.baseURL}/${date}`, { observe: 'response' })
            .pipe(map((res: HttpResponse<any[]>) => this.convertDateArrayFromServerserveur(res)));
       }
       protected convertDateArrayFromServerserveur(res: HttpResponse<any[]>): HttpResponse<any[]> {
        if (res.body) {
          res.body.forEach(seance => {
            seance.heureDebut = seance.heureDebut != null ? moment(seance.heureDebut) : undefined;
            seance.heureFin = seance.heureFin != null ? moment(seance.heureFin) : undefined;
          });
         
        }
        return res;
      }


}
