import { Component, OnInit, Input } from '@angular/core';
import { PostmanService } from '../../postman.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;

  constructor(private postmanService: PostmanService,
              private utilityService: UtilityService) { }

  ngOnInit(): void { }

  promoteTask(): void{
    this.task.status += 1;
    this.updateTask(this.task);
  }

  demoteTask(): void{
    this.task.status -= 1;
    this.updateTask(this.task);
  }

  private updateTask(task: object): void {
    this.postmanService.updateTask(task).subscribe((response) => {
      this.utilityService.sendMessage(true);
    });
  }

}
