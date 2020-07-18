import { Injectable } from '@angular/core';
import { PostmanService } from './postman.service';
import { RoutingService } from './routing.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component'


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private matDialog: MatDialog) { }

  public getAuthenticatedUser(): object{
    return JSON.parse(localStorage.getItem('user'));
  }

  public getToken(): object{
    if (this.loggedIn()){
      // tslint:disable-next-line: no-string-literal
      return JSON.parse(localStorage.getItem('user'))['access_token'];
    }
  }

  public getRefreshToken(): object{
    return JSON.parse(localStorage.getItem('user'));
  }

  public loggedIn(): boolean{
    return !!localStorage.getItem('user');
  }

  public logoutUser(): void{
    this.postmanService.userLogout().subscribe((response) => {
      localStorage.clear();
    });
    this.routingService.navigateToLogin();
  }

  public openInfoDialog(heading: string, msg: string): void{
    this.matDialog.open(InfoDialogComponent, {
      // height: '400px',
      // width: '600px',
      data: { heading, msg },
    });
  }
}
