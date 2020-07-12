import { Component , OnInit} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PostmanService } from './postman.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  events: string[] = [];
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
  sCheck=''

  
  arr = [1,3,5,76,8,9,3];
  
  constructor(private postmanService: PostmanService) { }

  ngOnInit(): void {
    this.sCheck='Error: Can not reach server';
    this.postmanService.getAPICheck().subscribe((response)=>{
      
      this.sCheck=response['msg']; 
    })
  }
  
 

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    // this.postmanService.demo()
    moveItemInArray(this.myList, event.previousIndex, event.currentIndex);
  }
}

