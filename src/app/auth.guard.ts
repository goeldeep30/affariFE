import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UtilityService } from './utility.service';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private utilityService: UtilityService,
              private routingService: RoutingService) { }

  canActivate(): boolean {
    if (this.utilityService.loggedIn()) {
      return true;
    }
    else {
      this.routingService.navigateToLogin();
      return false;
    }
  }
}
