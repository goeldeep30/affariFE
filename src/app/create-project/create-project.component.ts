import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService) { }

  ngOnInit(): void {
  }

  createProject(project: object): void {
    this.postmanService.createProject(project).subscribe((response) => {
    }, error => {
      if (error.status === 401) {
        this.routingService.navigateToLogin();
      }
    });
  }

  onSubmit(form: NgForm): void {
    debugger;
    this.createProject(form.value);
  }

}
