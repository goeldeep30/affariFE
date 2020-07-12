import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  constructor(private http: HttpClient) { }

  demo(): void {
    alert('I am demo func from PM sevice');
  }

  getTodos() {
    return this.http.get('https://be087e9a6f56.ngrok.io', { responseType: 'json' });
  }

  getProjects() {
    return this.http.get('http://localhost:5000/projects', { responseType: 'json' });
  }

  getTasks(project_id: number) {
    return this.http.get(`http://localhost:5000/tasks?project_id=${project_id}`, { responseType: 'json' });
  }

  getAPICheck() {
    return this.http.get('http://localhost:5000', { responseType: 'json' });
  }



}
