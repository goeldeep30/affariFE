import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { PostmanService } from '../postman.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskStatus } from '../enums';
import { UtilityService } from '../utility.service';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private projectId: number;
  private updateSubscription: Subscription;
  blocked: object[] = [];
  todo: object[] = [];
  inProgress: object[]  = [];
  done: object[] = [];
  // BKP needed to reset the search filters
  blockedBkp: object[];
  todoBkp: object[];
  inProgressBkp: object[];
  doneBkp: object[];
  searchBkp = '';
  readonly taskStatus: any = {
    blocked: TaskStatus.BLOCKED,
    todo: TaskStatus.TODO,
    inProgress: TaskStatus.INPROGRESS,
    done: TaskStatus.DONE
  };

  constructor(private route: ActivatedRoute, private postmanService: PostmanService,
              private utilityService: UtilityService,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectid');
    // const filterQry: string = this.route.snapshot.paramMap.get('search');
    this.updateKanban();
    this.updateSubscription = interval(5000).subscribe(
      (val) => { this.updateKanban();
      });
    // this.filterKanBan(filterQry);
    this.subscription = this.utilityService.getMessage().subscribe(message => {
      if (message) {
        this.updateKanban();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  private updateKanban(): void {
    this.postmanService.getTasks(this.projectId).subscribe((response) => {
      this.blocked = response.blocked;
      this.todo = response.to_do;
      this.inProgress = response.in_progress;
      this.done = response.done;

      this.blockedBkp = response.blocked;
      this.todoBkp = response.to_do;
      this.inProgressBkp = response.in_progress;
      this.doneBkp = response.done;

      // Applyig search filter
      this.applySearchFilter(this.searchBkp);

      if ((response.blocked.length + response.to_do.length
        + response.in_progress.length + response.done.length) > 0) { }
      else {
        this.utilityService.openInfoBar('No data to present');
      }
    }, error => {
      this.utilityService.openInfoBar('Error, Please check your connection','');
    }
    );
  }

  private filterKanBan(list: any[], filterQuery: string): any[] {
    return list.filter((element) => {
      element.subject = element.subject ? element.subject : '';
      element.description = element.description ? element.description : '';
      element.assigned_user = element.assigned_user ? element.assigned_user : '';
      return (
        element.subject.toLowerCase().includes(filterQuery) ||
        element.description.toLowerCase().includes(filterQuery) ||
        element.assigned_user.toLowerCase().includes(filterQuery));
    });
      // .sort((a, b) => a.subject.includes(filterQuery) &&
      //   !b.id.includes(filterQuery) ? -1 : b.id.includes(filterQuery) &&
      //     !a.id.includes(filterQuery) ? 1 : 0);
  }

  applySearchFilter(searchFilter: string): void{
    searchFilter = searchFilter.toLowerCase();
    this.searchBkp = searchFilter;
    this.blocked = this.filterKanBan(this.blockedBkp, searchFilter);
    this.todo = this.filterKanBan(this.todoBkp, searchFilter);
    this.inProgress = this.filterKanBan(this.inProgressBkp, searchFilter);
    this.done = this.filterKanBan(this.doneBkp, searchFilter);
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

      // this.openSnackBar('Somethin is changed', 'refresh');
    }
  }

  // openSnackBar(message: string, action: string): void {
  //   this.utilityService.openInfoBar(message, action)
  //   .onAction().subscribe(() => {
  //     this.updateKanban();
  //   });
  // }

  openDialog(): void {
    this.matDialog.open(CreateTaskComponent, {
      // height: '400px',
      width: '600px',
      data: {
        task: {
          project_id: this.projectId
        }
      },
    });
  }

  downloadJSON(): void{
    const temp: object[] = [];
    temp.push(this.blockedBkp);
    temp.push(this.todoBkp);
    temp.push(this.inProgressBkp);
    temp.push(this.doneBkp);
    console.log(JSON.stringify(temp));
  }

}
