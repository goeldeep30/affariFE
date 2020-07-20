import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';
import { SelectItem } from 'primeng/api';
import { TaskStatus } from '../enums';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  TaskStatus: SelectItem[];
  selectedTaskStatus = TaskStatus.TODO; // Default value to prevent error on data bindong on component init
  projectMembers: any[] = [];
  selectedMemberId: number = null;
  taskFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.TaskStatus = [
      { label: 'Blocked', value: TaskStatus.BLOCKED },
      { label: 'To Do', value: TaskStatus.TODO },
      { label: 'In Progress', value: TaskStatus.INPROGRESS },
      { label: 'Done', value: TaskStatus.DONE }
    ];

    this.postmanService.getProjectMembers(this.data.projectId).subscribe((response: any) => {
      for (const member of response.members) {
        this.projectMembers.push({ label: member.username, value: member.id });
      }
      this.selectedMemberId = response.members[0].id;
    });
  }

  createTask(task: object): void {
    this.postmanService.createTask(task).subscribe((response) => {
    }, error => {
      if (error.status === 401) {
        this.routingService.navigateToLogin();
      }
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid){
      this.createTask(form.value);
    }
    else{
      this.utilityService.openInfoDialog('Error', 'Please fill form correctly');
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
