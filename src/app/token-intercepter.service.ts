import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {

  constructor(private utilityService: UtilityService,
              private routingService: RoutingService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludeURI = '/login';
    if (request.url.search(excludeURI) === -1 ){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.utilityService.getToken()}`
        }
      });
    }
    return next.handle(request)
      .pipe(
        catchError(err => {
          console.log('Error=> : ', err);
          console.log(err.error.msg);
          switch (err.status) {
            case 401: {
              switch (err.error.err) {
                case 'INVALID_TOKEN_ERR':
                  window.localStorage.clear();
                  break;
              }
              console.log('need to Login again');
              this.routingService.navigateToLogin();
              break;
            }
            default: {
              console.log('Some error happened, Please logout and try again');
            }
          }
          return throwError(err.error.msg);

        })
      );
  }
}
