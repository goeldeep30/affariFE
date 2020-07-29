import { Component, Input } from '@angular/core';
import { RoutingService } from 'src/app/routing.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project: any;

  constructor(private routingService: RoutingService,
              private matDialog: MatDialog) { }

  onSelect(): void{
    this.routingService.navigateToKanban(this.project.id);
  }

  onEditProject(): void{
    this.openDialog();
  }

  openDialog(): void {
    this.matDialog.open(CreateProjectComponent, {
      // height: '400px',
      width: '600px',
      data: {
        project: this.project
      },
    });
  }

}
