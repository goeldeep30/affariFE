import { Component, Input } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isUserLoggedIn: boolean;

  constructor(private utilityService: UtilityService) {
    this.isUserLoggedIn = false;
  }

  logoutUser(): void{
    this.utilityService.logoutUser();
  }

}
