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
  name!: any;
  dueDate!: any;
  course!: any;
  
  constructor(private projectService: ProjectService) {}  
  
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
  });
}

addProject(): void {
  let newProject = {
    name: this.name,
    dueDate: this.dueDate,
    course: this.course,
  }
  this.projectService.addProject(newProject).subscribe(response => {
    this.getProjects();

});
}
clearForm(): void{
  this.name ='';
  this.course ='';
  this.dueDate ='';
}
}