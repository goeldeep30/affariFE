import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  logoutUser(): void{
    this.utilityService.logoutUser();
  }

}
