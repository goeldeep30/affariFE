import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PostmanService } from '../postman.service';
import { Router } from '@angular/router';


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
              private router: Router) { }

  ngOnInit(): void { }

  authoriseMe(credentials: object): void {
    this.postmanService.getAuthToken(credentials).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/projects']);
    });
  }

  onSubmit(form: NgForm): void {
    this.authoriseMe(form.value);
  }

}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
