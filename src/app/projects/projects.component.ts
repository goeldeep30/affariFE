import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: object[];
  // Bkp needed to reset search filter
  projectsBkp: object[];
  subscription: Subscription;

  constructor(private routingService: RoutingService,
              private postmanService: PostmanService,
              private utilityService: UtilityService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getProjects();
    this.subscription = this.utilityService.getMessage().subscribe(message => {
      if (message) {
        this.getProjects();
      }
      });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  private getProjects(): void {
    this.postmanService.getProjects().subscribe((response) => {
      this.projects = response.Projects;
      this.projectsBkp = response.Projects;
    },
      error => {
        if (error.status === 401) {
          this.routingService.navigateToLogin();
        }
      });
  }

  private filterProjects(list: any[], filterQuery: string): any[] {
    return list.filter(e => e.project_name.toLowerCase().includes(filterQuery)
      || e.project_desc.toLowerCase().includes(filterQuery)
      || e.owner.toLowerCase().includes(filterQuery)
      );
  }

  applySearchFilter(searchFilter: string): void{
    this.projects = this.filterProjects(this.projectsBkp, searchFilter.toLowerCase());
  }

  onSelect(projectId: number): void {
    this.routingService.navigateToKanban(projectId);
  }

  openDialog(): void {
    this.matDialog.open(CreateProjectComponent, {
      // height: '400px',
      width: '600px',
      //  data: { projects: this.projects },
    }).afterClosed().subscribe(() => {
      // this.getProjects();
    });
  }
}
