import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  constructor(private http: HttpClient) { }

  demo(): void {
    alert('I am demo func from PM sevice');
  }

  getTodos(): Observable<any> {
    return this.http.get('https://be087e9a6f56.ngrok.io', { responseType: 'json' });
  }

  getProjects(): Observable<any> {
    return this.http.get('http://localhost:5000/projects', { responseType: 'json' });
  }

  getProjectMembers(projectId: number): Observable<any> {
    return this.http.get(`http://localhost:5000/project_members/${projectId}`, { responseType: 'json' });
  }

  getTasks(projectId: number): Observable<any> {
    return this.http.get(`http://localhost:5000/tasks?project_id=${projectId}`, { responseType: 'json' });
  }

  createTask(task: object): Observable<any> {
    return this.http.post(
      'http://localhost:5000/tasks', 
      task,
      { responseType: 'json' }
    );
  }

  updateTask(task: object): Observable<any> {
    return this.http.put(
      'http://localhost:5000/tasks',
      task,
      { responseType: 'json' }
    );
  }

  getAPICheck(): Observable<any> {
    return this.http.get('http://localhost:5000', { responseType: 'json' });
  }

  getAuthToken(credentials: object): Observable<any> {
    return this.http.post(
      'http://localhost:5000/login',
      credentials,
      { responseType: 'json' }
    );
  }





}
