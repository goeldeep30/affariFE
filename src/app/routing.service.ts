import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public navigateToSignUp(): void{
    this.router.navigate(['signup']);
  }

  public navigateToLogin(): void{
    this.router.navigate(['login']);
  }

  public navigateToKanban(projectId: number): void{
    this.router.navigate(['kanban', projectId]);
  }

  public navigateToProjects(): void{
    this.router.navigate(['projects']);
  }
}
