import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostmanService } from '../postman.service';
import { RoutingService } from '../routing.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private postmanService: PostmanService,
              private routingService: RoutingService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  createUser(user: object): void {
    this.postmanService.createUser(user).subscribe((response) => {
      // localStorage.setItem('user', JSON.stringify(response));
      this.routingService.navigateToLogin();
    }, error => {
      this.utilityService.openInfoDialog('Error', JSON.stringify(error));
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

}
