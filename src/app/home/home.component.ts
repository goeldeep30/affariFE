import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';
import { PostmanService } from '../postman.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: string[] = [];
  sCheck = '';
  constructor(private routingService: RoutingService,
              private postmanService: PostmanService) { }

  ngOnInit(): void {
    this.sCheck = 'Error: Can not reach server';
    this.postmanService.getAPICheck().subscribe((response) => {
      this.sCheck = response['msg'];
    });
  }

  navigateToLogin(): void{
    this.routingService.navigateToLogin();
  }

  navigateToSignUp(): void{
    this.routingService.navigateToSignUp();
  }
}
