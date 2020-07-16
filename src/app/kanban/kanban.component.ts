import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PostmanService } from '../postman.service';
import { CreateTaskComponent } from '../create-task/create-task.component';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  private projectId: number;
  blocked: object[];
  todo: object[];
  inProgress: object[];
  done: object[];
  constructor(private route: ActivatedRoute, private postmanService: PostmanService,
              private snackBar: MatSnackBar,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectid');
    this.updateKanban(this.projectId);
  }
  private updateKanban(projectId: number): void {
    this.postmanService.getTasks(this.projectId).subscribe((response) => {
      this.blocked = response.blocked;
      this.todo = response.to_do;
      this.inProgress = response.in_progress;
      this.done = response.done;
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.openSnackBar('Somethin is changed', 'refresh');
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    }).onAction().subscribe(() => {
      console.log('Action taken on snackbar');
      this.updateKanban(this.projectId);

    });
  }

  openDialog(): void {
    this.matDialog.open(CreateTaskComponent);
  }
}
