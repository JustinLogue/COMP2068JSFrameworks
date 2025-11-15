import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service'; 

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projects: any;
  
  constructor(private projectService: ProjectService) {}  
  
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
  });
}
}
