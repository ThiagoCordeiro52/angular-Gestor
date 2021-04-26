 import { Component, OnInit } from '@angular/core';
 import { NavComponent } from '../../nav/nav.component';
 import { HeaderComponent } from '../../header/header.component';
 import { TaskService } from '../../../../services/task.service';
 import { Task } from '../../../../models/task';
 import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  // copia o carro para ser editado.
  editTask(task: Task) {
    this.task = { ...task };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getTasks();
    form.resetForm();
    this.task = {} as Task;
  }


}
