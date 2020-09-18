import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {
  title = 'Reset password';
  userPasswordResetForm: FormGroup;
  username: FormControl;

  constructor(private postmanService: PostmanService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.userPasswordResetForm = new FormGroup({
      username: this.username
    });
  }

  sendPasswordResetLink(user: object): void {
    this.postmanService.userResetPassword(user).subscribe((response) => {
      this.utilityService.openInfoDialog("reset", response?.msg);

    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.sendPasswordResetLink(form.value);
    }
  }

  getErrorMessage(): string {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }

}
