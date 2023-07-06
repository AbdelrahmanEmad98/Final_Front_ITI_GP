import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class DataService implements HttpInterceptor {
  private showSpinner: boolean = false;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show the spinner
    this.showSpinner = true;

    return next.handle(req).pipe(
      // Delay the response for 5 seconds
      delay(5000),
      finalize(() => {
        // Hide the spinner
        this.showSpinner = false;
      })
    );
  }

  isSpinnerVisible(): Observable<boolean> {
    // Return the spinner visibility as an observable
    return of(this.showSpinner);
  }
}
