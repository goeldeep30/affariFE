import { Component, OnInit, Input } from '@angular/core';
import { PostmanService } from '../../postman.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;

  constructor(private postmanService: PostmanService) { }

  ngOnInit(): void { }

}
