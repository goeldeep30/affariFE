import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { PostmanService } from '../../postman.service';
import { RoutingService } from '../../routing.service';
import { UtilityService } from '../../utility.service';
import { SelectItem } from 'primeng/api';
import { TaskStatus } from '../../enums';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  title: string;
  selectedFile: File;
  TaskStatus: SelectItem[];
  selectedTaskStatus: number;
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
    if (this.data.task){
      this.title = this.data.task.id ? 'Update Task' : 'Create Task';
    }
    this.TaskStatus = [
      { label: 'Blocked', value: TaskStatus.BLOCKED },
      { label: 'To Do', value: TaskStatus.TODO },
      { label: 'In Progress', value: TaskStatus.INPROGRESS },
      { label: 'Done', value: TaskStatus.DONE }
    ];
    this.selectedTaskStatus = this.data.task.id ? this.data.task.status : TaskStatus.TODO;

    this.postmanService.getProjectMembers(this.data.task.project_id).subscribe((response: any) => {
      for (const member of response.members) {
        this.projectMembers.push({ label: member.username, value: member.id });
      }
      this.selectedMemberId = this.data.task.id ? this.data.task.user_id : response.members[0].id;
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  createTask(task: object): void {
    this.postmanService.createTask(task).subscribe((response) => {
      this.utilityService.sendMessage(true);
      this.utilityService.openInfoBar(response.msg);
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  updateTask(task: object): void {
    this.postmanService.updateTask(task).subscribe((response) => {
      this.utilityService.openInfoBar(response.msg);
      this.utilityService.sendMessage(true);
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  onFileSelection(event: any): void {
    this.selectedFile = (event.target.files[0] as File);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      form.value.ref_image = this.selectedFile;
      if (this.data.task.id){
        this.updateTask(form.value);
      }
      else{
        this.createTask(form.value);
      }
    }
    else {
      this.utilityService.openInfoDialog('Error', 'Please fill the form correctly');
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
