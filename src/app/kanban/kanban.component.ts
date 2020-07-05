import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  titlee:string;
  subTitlee:string;
  constructor() { } 

  ngOnInit(): void {
    this.titlee = 'deep';
    this.subTitlee ='MZP';
  }

}
