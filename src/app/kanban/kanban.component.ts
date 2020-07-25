import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskStatus } from '../enums';
import { UtilityService } from '../utility.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  subscription: Subscription;
  private projectId: number;
  blocked: object[];
  todo: object[];
  inProgress: object[];
  done: object[];
  readonly taskStatus: any = {
    blocked: TaskStatus.BLOCKED,
    todo: TaskStatus.TODO,
    inProgress: TaskStatus.INPROGRESS,
    done: TaskStatus.DONE
  };

  constructor(private route: ActivatedRoute, private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService,
              private snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectid');
    this.updateKanban();
    this.subscription = this.utilityService.getMessage().subscribe(message => {
      if (message) {
        this.updateKanban();
      }
      });
  }
  onDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateKanban(): void {
    this.postmanService.getTasks(this.projectId).subscribe((response) => {
      if ((response.blocked.length + response.to_do.length
        + response.in_progress.length + response.done.length) > 0) {
        this.blocked = response.blocked;
        this.todo = response.to_do;
        this.inProgress = response.in_progress;
        this.done = response.done;
      }
      else {
        this.utilityService.openInfoDialog('Info', 'No data to present');
      }
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    }
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let task: any = event.previousContainer.data[event.previousIndex];
      task.status = event.container.id;
      this.postmanService.updateTask(task)
        .subscribe((response: object): void => {
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          task = null;
        },
          error => {
            this.utilityService.openInfoDialog('Error', error);
          }
        );

      this.openSnackBar('Somethin is changed', 'refresh');
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    }).onAction().subscribe(() => {
      console.log('Action taken on snackbar');
      this.updateKanban();

    });
  }

  openDialog(): void {
    this.matDialog.open(CreateTaskComponent, {
      // height: '400px',
      width: '600px',
      data: { projectId: this.projectId },
    });
  }

}
