import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {

  constructor(private utilityService: UtilityService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenisedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.utilityService.getToken()}`
      }
    });
    return next.handle(tokenisedRequest)
      .pipe(
        catchError(err => {
          console.log('fvedcsw: ', err);
          console.log(err.error.msg);
          switch (err.status) {
            case 401: {
              console.log('need to logout');
              break;
            }
            default: {
              console.log('Some error happened, Please logout and try again');
            }
          }
          return throwError('Invalid HTTP Reqiuest');

        })
      );
  }
}
