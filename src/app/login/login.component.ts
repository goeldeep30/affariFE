import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService) { }

  ngOnInit(): void { }

  authoriseMe(credentials: object): void {
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

}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
