import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PostmanService } from '../postman.service'

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  myList=[
    'a',
    'b',
    'f',
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ]

  constructor(private postmanService: PostmanService) { }

  ngOnInit(): void {
    
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    this.postmanService.demo()
    // debugger
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
