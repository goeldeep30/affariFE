import { Component, OnInit } from '@angular/core';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: object;

  constructor(private routingService: RoutingService,
              private postmanService: PostmanService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.updateProjects();
  }

  private updateProjects(): void {
    this.postmanService.getProjects().subscribe((response) => {
      this.projects = response.Projects;
    },
      error => {
        if (error.status === 401) {
          this.routingService.navigateToLogin();
        }
      });
  }

  onSelect(projectId: number): void {
    this.routingService.navigateToKanban(projectId);
  }

  openDialog(): void {
    this.matDialog.open(CreateProjectComponent, {
      // height: '400px',
      width: '600px',
      // data: { projectId: this.projectId },
    }).afterClosed().subscribe(() => {
      this.updateProjects();
    });
  }
}
