import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

interface Task {
  id: number;
  description: string;
}
interface task {
  id: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestor | Seu gerenciador de tarefas';
  tasks!: Task[];
  myTask!: string;
  taskEdit!: string;
  editMode =  false;
  loading = false;
  constructor(private appservice: AppService) {}
 ngOnInit() {
  this.getAllTasks();
  } //ngOnInit
 getAllTasks() {
  this.appservice.getTasks().subscribe(data => {
  this.tasks = data;
  });
  } //getAllTasks
 create() {
  this.loading = true;
  const postData = {
  description: this.myTask
  };
 this.appservice.createTask(postData).subscribe(data => {
  this.loading = false;
  this.getAllTasks();
  this.myTask = '';
  });
  } //create
 edit(task: task) {
  this.taskEdit = Object.assign({}, task);
  task.editing = true;
  this.editMode = true;
  } //edit
 saveEdit(task: task) {
  this.appservice.updateTask(this.taskEdit).subscribe(data => {
  //task = data;
  this.getAllTasks();
  task.editing = false;
  this.editMode = false;
  });
  } //saveEdit
 delete(task) {
  console.log('Delete');
  this.appservice.deleteTask(task.id).subscribe(data => {
  this.getAllTasks();
  });
  } //delete
 }
