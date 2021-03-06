import { Component, OnInit, Input } from '@angular/core';
import { PostmanService } from '../../postman.service';
import { UtilityService } from '../../utility.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;
  desktop: boolean;

  constructor(private postmanService: PostmanService,
              private utilityService: UtilityService,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.desktop = false;
    this.task.description = this.task.description ? this.task.description : '';
    if (window.screen.width > 1000) {
      this.desktop = true;
    }
  }

  promoteTask(): void {
    this.task.status += 1;
    this.updateTask(this.task);
  }

  demoteTask(): void {
    this.task.status -= 1;
    this.updateTask(this.task);
  }

  deleteTask(): void {
    this.utilityService.openConfirmDialog('Are you sure ?', 'You can lose your data forever...').afterClosed()
      .subscribe((result) => {
        if (result) {
          this.postmanService.deleteTask(this.task.id).subscribe((response) => {
            this.utilityService.sendMessage(true);
            this.utilityService.openInfoBar(response.msg);
          }, error => {
            this.utilityService.openInfoDialog('Error', error);
          }
          );
        }
      });
  }

  openDialog(): void {
    this.matDialog.open(CreateTaskComponent, {
      // height: '400px',
      width: '600px',
      data: {
        task: this.task
      },
    });
  }

  private updateTask(task: object): void {
    this.postmanService.updateTask(task).subscribe((response) => {
      this.utilityService.sendMessage(true);
    });
  }

  cloneTask(): void {
    this.postmanService.createTask(this.task).subscribe((response) => {
      this.utilityService.sendMessage(true);
      this.utilityService.openInfoBar('Task cloned successfully');
    });
  }

}
