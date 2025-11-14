import { Component, signal } from '@angular/core';
interface Project{
  name:string;
  dueDate:string;
  status:string;
}

const PROJECTS: Project[] =[
  {name: "LAB01", dueDate: "2025-11-15", status: "Completed"},
  {name: "LAB02", dueDate: "2025-11-22", status: "In Progress"},
  {name: "LAB03", dueDate: "2025-11-29", status: "Not Started"},
]

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My Angular App');
  protected readonly projects: Project[]=PROJECTS;
  showAlert() {
    alert("Hello Everyone!");
  }
}
