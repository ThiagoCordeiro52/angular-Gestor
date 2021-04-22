import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
    base_url: string = "http://mybackend.com/api/";
    tasks_endpoint = "tasks";
    constructor(private http: HttpClient) {} 

    //Gets all tasks 
    getTasks() {
        return this.http.get(this.base_url + this.tasks_endpoint).pipe(map(res => res));
    } //getTasks


    //Creates a task 
    createTask(task: []) {
        return this.http.post(this.base_url + this.tasks_endpoint, task).pipe(map(res => res));
    } //CreateTask


    //Updates a Task 
    updateTask(update: []) {
        return this.http.put(this.base_url + this.tasks_endpoint, update).pipe(map(res => res));
    } //UpdateTAsk
    

    //Deletes a Task
    deleteTask(taskId: number) {
        return this.http.delete(`${this.base_url + this.tasks_endpoint}/${taskId}`).pipe(map(res => res))
    } //deleteTask
}