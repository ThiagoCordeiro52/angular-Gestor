import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestor | Seu gerenciador de tarefas';
  

  task = {} as Task;
  tasks!: Task[];

  constructor(private taskService: TaskService) {}
  
  ngOnInit() {
    this.getTasks();
  }

  // defini se um carro será criado ou atualizado
  saveTask(form: NgForm) {
    if (this.task.id !== undefined) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.taskService.saveTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // deleta um carro
  deleteCar(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  // copia o carro para ser editado.
  editCar(task: Task) {
    this.task = { ...task };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getTasks();
    form.resetForm();
    this.task = {} as Task;
  }

}
