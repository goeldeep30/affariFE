import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  hide = true;

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    if (window.localStorage.getItem('user')){
      this.routingService.navigateToProjects();
    }
    else{
      this.username = new FormControl('', [Validators.required, Validators.email]);
      this.password = new FormControl('', Validators.required);
      this.userLoginForm = new FormGroup({
        username : this.username,
        password : this.password
      });
    }
  }

  private authoriseMe(credentials: object): void {
    this.postmanService.getAuthToken(credentials).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.routingService.navigateToProjects();
    }, error => {
      this.utilityService.openInfoDialog('Error', error);
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid){
      this.authoriseMe(form.value);
    }
  }

  navigateToSignUp(): void{
    this.routingService.navigateToSignUp();
  }

  getErrorMessage(): string{
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }

}
