import { Component, Input } from '@angular/core';
import { RoutingService } from 'src/app/routing.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog } from '@angular/material/dialog';
import { PostmanService } from 'src/app/postman.service';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project: any;
  panelOpenState: boolean;

  constructor(private routingService: RoutingService,
              private postmanService: PostmanService,
              private utilityService: UtilityService,
              private matDialog: MatDialog) { }

  onSelect(): void {
    this.routingService.navigateToKanban(this.project.id);
  }

  onEditProject(): void {
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

  onDeleteProject(): void {
    this.utilityService.openConfirmDialog('Are you sure ?', 'You can lose your data forever...').afterClosed()
      .subscribe((result) => {
        if (result){
          this.postmanService.deleteProject(this.project.id).subscribe((response) => {
            this.utilityService.sendMessage(true);
            this.utilityService.openInfoBar(response.msg);
          }, error => {
            this.utilityService.openInfoDialog('Error', error);
          });
        }
      });
  }

}
