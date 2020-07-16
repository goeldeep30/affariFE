import { Component, OnInit } from '@angular/core';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: object;

  constructor(private routingService: RoutingService,
              private postmanService: PostmanService) { }

  ngOnInit(): void {
    this.postmanService.getProjects().subscribe((response) => {
      this.projects = response.Projects;
    },
      error => {
        if (error.status === 401){
          this.routingService.navigateToLogin();
        }
      });
  }

  onSelect(projectId: number): void {
    this.routingService.navigateToKanban(projectId);
  }

}
