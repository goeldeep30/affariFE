import {Component} from '@angular/core';
import {ENTER, SEMICOLON} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Member {
  username: string;
}
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PostmanService } from '../../postman.service';
import { RoutingService } from '../../routing.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, SEMICOLON];
  members: Member[] = [];

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService) { }

  createProject(project: object): void {
    this.postmanService.createProject(project).subscribe((response) => {
      this.utilityService.sendMessage(true);
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const members = value.split(';');
      // alert(fruitss[0])
      for (const membr of members){
        if (!!membr){
          this.members.push({username: membr.trim()});
        }
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(membr: Member): void {
    const index = this.members.indexOf(membr);

    if (index >= 0) {
      this.members.splice(index, 1);
    }
  }


}
