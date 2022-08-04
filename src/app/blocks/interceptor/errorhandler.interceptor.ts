import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CalendarService } from 'app/main/calendar/calendar.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private loader: CalendarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.loader.show();
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes('api/account'))))) {

        }
      }),
      finalize(() => {
        this.loader.hide();
      })
    );
      
  }
}
