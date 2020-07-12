import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PostmanService } from '../postman.service'


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  blocked:Object[];
  todo: Object[];
  in_progress: Object[];
  done: Object[];
  constructor(private route: ActivatedRoute, private postmanService: PostmanService) { } 

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectid')
    this.postmanService.getTasks(+projectId).subscribe((response) => {
      this.blocked = response['blocked']
      this.todo = response['to_do'];
      this.in_progress = response['in_progress'];
      this.done = response['done'];
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
