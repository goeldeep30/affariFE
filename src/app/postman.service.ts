import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  constructor() { }

  demo(){
    alert("I am demo func from PM sevice")
  }

}
