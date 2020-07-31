import {Component,OnInit, Inject} from '@angular/core';
import {ENTER, SEMICOLON} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Member {
  username: string;
}
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PostmanService } from '../../postman.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  title: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, SEMICOLON];
  members: Member[] = [];

  constructor(private postmanService: PostmanService,
              private utilityService: UtilityService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void{
    this.title = 'Create Project';
    if (this.data){
      this.title = 'Update Project';
      this.postmanService.getProjectMembers(this.data.project.id).subscribe((response) => {
        for (const member of response.members){
          this.members.push({username: member.username});
        }
      });
    }
  }

  createProject(project: object): void {
    this.postmanService.createProject(project).subscribe((response) => {
      this.utilityService.sendMessage(true);
      this.utilityService.openInfoBar(response.msg);
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  updateProject(project: object): void {
    this.postmanService.updateProject(project).subscribe((response) => {
      this.utilityService.sendMessage(true);
      this.utilityService.openInfoBar(response.msg);
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid){
      if (this.data){
        this.updateProject(form.value);
      }
      else{
        this.createProject(form.value);
      }
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
