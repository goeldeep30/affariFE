import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from '../utility.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isUserLoggedIn: boolean;
  @Output() newSearchFilterEvent = new EventEmitter<string>();

  constructor(private utilityService: UtilityService) {
    this.isUserLoggedIn = false;
  }

  logoutUser(): void{
    this.utilityService.logoutUser();
  }

  onSearchSubmit(form: NgForm): void{
    this.newSearchFilterEvent.emit(form.value);
  }

}
