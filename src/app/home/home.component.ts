import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private routingService: RoutingService) { }

  ngOnInit(): void {
  }

  navigateToLogin(): void{
    this.routingService.navigateToLogin();
  }

  navigateToSignUp(): void{
    this.routingService.navigateToSignUp();
  }
}
