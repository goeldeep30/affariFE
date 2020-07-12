import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostmanService } from '../postman.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: object;

  constructor(private router: Router,
              private postmanService: PostmanService) { }

  ngOnInit(): void {
    this.postmanService.getProjects().subscribe((response) => {
      // debugger
      this.projects = response['Projects'];
    });
  }

  onSelect(projectId: number): void {
    this.router.navigate(['kanban', projectId]);
  }

}
