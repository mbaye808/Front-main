import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventManager, EventWithContent } from '../util/event-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private eventManager: EventManager,private snackBar:MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      return next.handle(request).pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (!(err.status === 401 && (err.message === '' || err.url?.includes('api/account')))) {
              this.eventManager.broadcast(new EventWithContent('eeApp.httpError', err));
            }
            if(err.status === 404 ||err.status ==0){
              this.snackBar.open('le serveur n\'est pas disponible pour le moment !', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
            }
          },
         
          
        })
      );
  }
}
