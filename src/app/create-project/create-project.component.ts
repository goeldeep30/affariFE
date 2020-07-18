import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  createProject(project: object): void {
    this.postmanService.createProject(project).subscribe((response) => {
    }, error => {
      if (error.status === 401) {
        this.routingService.navigateToLogin();
      }
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid){
      this.createProject(form.value);
    }
    else{
      this.utilityService.openInfoDialog('Error', 'Please fill form correctly');
    }
  }


}
