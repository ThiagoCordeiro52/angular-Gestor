import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Task } from '../models/task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = 'http://localhost:3000/tasks'; // api rest fake

  constructor(private httpClient: HttpClient) { }

  //Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  //obtem todas as tasks 
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url).pipe(
      retry(2),
      catchError(this.handleError))
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.url + '/' + id).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // salva uma task 
  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, JSON.stringify(task), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.url + '/' + task.id, JSON.stringify(task), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteTask(task: Task) {
    return this.httpClient.delete<Task>(this.url + '/' + task.id, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Manipulação de error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status},` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}



