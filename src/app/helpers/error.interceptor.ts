import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Notifier} from '../notifier/notifier';
import {from, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_ENTITY} from 'http-status-codes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private notifier: Notifier,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === UNAUTHORIZED) {
        this.notifier.showError('Token is expired.');
        return from(this.router.navigate(['/login']).then((_) => null));
      } else if (err.status === UNPROCESSABLE_ENTITY) {
        this.notifier.showError(err.error.message);
      } else if (err.status === INTERNAL_SERVER_ERROR) {
        this.notifier.showError('Something went wrong on backend side.');
      }

      console.log(err);

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
