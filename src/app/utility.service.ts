import { Injectable } from '@angular/core';
import { PostmanService } from './postman.service';
import { RoutingService } from './routing.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component'
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private subject = new Subject<any>();
  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) { }

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

  public openConfirmDialog(heading: string, subHeading: string): MatDialogRef<ConfirmDialogComponent>{
    return this.matDialog.open(ConfirmDialogComponent, {
      data: {heading, subHeading},
    });
  }

  public openInfoBar(msg: string, action: string = '', duration: number = 5000): MatSnackBarRef<TextOnlySnackBar>{
    return this.snackBar.open(msg, action, {
      duration,
    });
  }

  public sendMessage(created: boolean): void {
    this.subject.next({ text: created });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
