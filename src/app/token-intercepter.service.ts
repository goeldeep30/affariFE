import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private utilityService: UtilityService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const tokenisedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.utilityService.getToken()}`
      }
    });
    return next.handle(tokenisedRequest);
  }
}
