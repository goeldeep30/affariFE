import { Component, OnInit } from '@angular/core';
import { PostmanService } from './postman.service';
import { RoutingService } from './routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  events: string[] = [];
  sCheck = '';
  constructor(private postmanService: PostmanService,
              private routingService: RoutingService) { }

  ngOnInit(): void {
    this.sCheck = 'Error: Can not reach server';
    this.postmanService.getAPICheck().subscribe((response) => {
      this.sCheck = response['msg'];
    });
    this.routingService.navigateToProjects();
  }
}

