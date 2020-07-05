import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}

