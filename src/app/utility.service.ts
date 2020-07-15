import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public getAuthenticatedUser(): object{
    return JSON.parse(localStorage.getItem('user'));
  }

  public getToken(): object{
    if (this.loggedIn()){
      return JSON.parse(localStorage.getItem('user'))['access_token'];
    }
  }

  public getRefreshToken(): object{
    return JSON.parse(localStorage.getItem('user'));
  }

  public loggedIn(): boolean{
    return !!localStorage.getItem('user');
  }
}
