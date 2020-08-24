import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userSignUpForm: FormGroup;
  name: FormControl;
  username: FormControl;
  password: FormControl;
  rePassword: FormControl;
  access_level: FormControl;

  hide = true;

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    if (window.localStorage.getItem('user')){ // If user is already logged in
      this.routingService.navigateToProjects();
    }
    else{
      this.name = new FormControl('', Validators.required);
      this.username = new FormControl('', [Validators.required, Validators.email]);
      this.password = new FormControl('', Validators.required);
      this.rePassword = new FormControl('', Validators.required);
      this.access_level = new FormControl('', Validators.required);
      this.userSignUpForm = new FormGroup({
        name : this.name,
        username : this.username,
        password : this.password,
        rePassword : this.rePassword,
        access_level : this.access_level,
      },
      {validators:  this.verifyPassword}
      );
    }
  }

  createUser(user: object): void {
    this.postmanService.createUser(user).subscribe((response) => {
      // localStorage.setItem('user', JSON.stringify(response));
      this.utilityService.openInfoBar(response.msg);
      this.routingService.navigateToLogin();
    }, error => {
      this.utilityService.openInfoDialog('Error', 'Unable to create user. ' + error);
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid){
      this.createUser(form.value);
    }
    else{
      this.utilityService.openInfoDialog('Error', 'Enter form details correctly');
    }
  }

  navigateToLogin(): void{
    this.routingService.navigateToLogin();
  }

  getErrorMessage(): string{
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }

  verifyPassword(control: AbstractControl): any{
    const pass = control.value.password;
    const rePass = control.value.rePassword;
    const val = pass === rePass ? null : { notSame: true };
    if (val){
      control.get('rePassword').setErrors( {notMatched: true});
    }
    return val;
  }

  getErrorMessagePassword(): string{
    if (this.rePassword.hasError('required')) {
      return 'You must enter a value';
    }
    return this.rePassword.hasError('notSame') ? '' : 'Password did not matched';

  }

}
