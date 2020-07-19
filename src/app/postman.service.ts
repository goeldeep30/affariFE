import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {
  localURL = 'http://localhost:5000';
  herokuURL = 'https://affari.herokuapp.com';

  constructor(private http: HttpClient) { }

  demo(): void {
    alert('I am demo func from PM sevice');
  }

  getProjects(): Observable<any> {
    return this.http.get(this.herokuURL + '/projects', { responseType: 'json' });
  }

  getProjectMembers(projectId: number): Observable<any> {
    return this.http.get(this.herokuURL + `/project_members/${projectId}`, { responseType: 'json' });
  }

  createProject(project: object): Observable<any> {
    return this.http.post(
      this.herokuURL + '/projects',
      project,
      { responseType: 'json' }
    );
  }

  getTasks(projectId: number): Observable<any> {
    return this.http.get(this.herokuURL + `/tasks?project_id=${projectId}`, { responseType: 'json' });
  }

  createTask(task: object): Observable<any> {
    return this.http.post(
      this.herokuURL + '/tasks',
      task,
      { responseType: 'json' }
    );
  }

  updateTask(task: object): Observable<any> {
    return this.http.put(
      this.herokuURL + '/tasks',
      task,
      { responseType: 'json' }
    );
  }

  getAPICheck(): Observable<any> {
    return this.http.get(this.herokuURL, { responseType: 'json' });
  }

  createUser(user: object): Observable<any> {
    return this.http.post(
      this.herokuURL + '/register',
      user,
      { responseType: 'json' }
    );
  }

  getAuthToken(credentials: object): Observable<any> {
    return this.http.post(
      this.herokuURL + '/login',
      credentials,
      { responseType: 'json' }
    );
  }

  userLogout(): Observable<any> {
    return this.http.delete(this.herokuURL + '/logout', { responseType: 'json' });
  }





}
