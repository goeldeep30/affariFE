import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  varr ="deep"
  flag=false
  constructor() { }

  ngOnInit(): void {
  }
  
  private toggle_statement(){
    this.varr = this.flag?"deep":"deeptanshu"
    this.flag = !this.flag
  }

  func(){
    this.toggle_statement()
  }
}
