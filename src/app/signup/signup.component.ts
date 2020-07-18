import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService) { }

  ngOnInit(): void {
  }

  createUser(user: object): void {
    this.postmanService.createUser(user).subscribe((response) => {
      // localStorage.setItem('user', JSON.stringify(response));
      this.routingService.navigateToLogin();
    });
  }

  onSubmit(form: NgForm): void {
    this.createUser(form.value);
  }

}
