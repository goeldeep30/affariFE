import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {
  private URL: string;

  constructor(private http: HttpClient) {
    // this.URL = 'http://localhost:5000';
    this.URL = 'https://affari.herokuapp.com';
  }

  demo(): void {
    alert('I am demo func from PM sevice');
  }

  getProjects(): Observable<any> {
    return this.http.get(this.URL + '/projects', { responseType: 'json' });
  }

  getProjectMembers(projectId: number): Observable<any> {
    return this.http.get(this.URL + `/project_members/${projectId}`, { responseType: 'json' });
  }

  createProject(project: object): Observable<any> {
    return this.http.post(
      this.URL + '/projects',
      project,
      { responseType: 'json' }
    );
  }

  updateProject(project: object): Observable<any> {
    return this.http.put(
      this.URL + '/projects',
      project,
      { responseType: 'json' }
    );
  }

  getTasks(projectId: number): Observable<any> {
    return this.http.get(this.URL + `/tasks?project_id=${projectId}`, { responseType: 'json' });
  }

  createTask(task: object): Observable<any> {
    return this.http.post(
      this.URL + '/tasks',
      task,
      { responseType: 'json' }
    );
  }

  updateTask(task: object): Observable<any> {
    return this.http.put(
      this.URL + '/tasks',
      task,
      { responseType: 'json' }
    );
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(
      this.URL + `/tasks?id=${taskId}`,
      { responseType: 'json' }
    );
  }

  getAPICheck(): Observable<any> {
    return this.http.get(this.URL, { responseType: 'json' });
  }

  createUser(user: object): Observable<any> {
    return this.http.post(
      this.URL + '/register',
      user,
      { responseType: 'json' }
    );
  }

  getAuthToken(credentials: object): Observable<any> {
    return this.http.post(
      this.URL + '/login',
      credentials,
      { responseType: 'json' }
    );
  }

  userLogout(): Observable<any> {
    return this.http.delete(this.URL + '/logout', { responseType: 'json' });
  }





}
