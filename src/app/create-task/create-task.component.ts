import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService) { }

  ngOnInit(): void {
  }

  createTask(task: object): void {
    this.postmanService.createTask(task).subscribe((response) => {
    }, error => {
      if (error.status === 401){
        this.routingService.navigateToLogin();
      }
    });
  }

  onSubmit(form: NgForm): void {
    this.createTask(form.value);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
