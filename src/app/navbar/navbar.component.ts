import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isUserLoggedIn: boolean;
  @Output() newSearchFilterEvent = new EventEmitter<string>();
  title: string;
  desktop: boolean;
  loggedInUserName: string;

  ngOnInit(): void{
    this.desktop = false;
    this.title = '';
    if (window.screen.width > 1000) {
      this.desktop = true;
      this.title = 'Affari';
    }
  }

  constructor(private utilityService: UtilityService) {
    // this.isUserLoggedIn = false;
    this.loggedInUserName = utilityService.getLoggedInUsername();
  }

  logoutUser(): void{
    this.utilityService.logoutUser();
  }

  // onSearchSubmit(form: NgForm): void{
  //   this.newSearchFilterEvent.emit(form.value);
  // }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    this.newSearchFilterEvent.emit(searchValue);
  }

}
