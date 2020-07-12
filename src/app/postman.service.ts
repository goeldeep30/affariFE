import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  constructor(private http: HttpClient) { }

  demo() {
    alert("I am demo func from PM sevice")
  }

  getTodos() {
    return this.http.get('https://be087e9a6f56.ngrok.io', { responseType: 'json' });
  }

  getTasks() {
    return this.http.get('https://api.razorpay.com/', { responseType: 'json' });
  }

  getAPICheck() {
    return this.http.get('http://localhost:5000', { responseType: 'json' });
  }

}
