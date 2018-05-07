import { Injectable, Inject } from '@angular/core';
import { ToDoItem, ToDoItemCreationData } from './todo-item';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { map, repeatWhen, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IScheduler } from 'rxjs/Scheduler';
import { BASE_URL } from '../basUrl';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TodoRepository {

  toDoItems: ToDoItem[] = [];

  private toDoItemsSubject = new BehaviorSubject<ToDoItem[]>(this.toDoItems);

  private nextId = 1;

  private refreshSubject = new Subject<any>();

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

  public get todoItems$() {
    return this
      .http
      .get<ToDoItem[]>(`${this.baseUrl}api/todos`)
      .pipe(
        repeatWhen(foo => this.refreshSubject.asObservable())
      );
  }

  public add(toDoItem: ToDoItemCreationData) {
    return this.http.put(`${this.baseUrl}api/todos`, toDoItem)
    .pipe(
      tap(item => this.refreshSubject.next(item))
    );
  }

  public remove(id: number) {
    const newToDos = this.toDoItems.filter(todo => todo.id !== id);
    this.toDoItems = newToDos;
    this.toDoItemsSubject.next(newToDos);
  }

  public find(id: number): ToDoItem {
    return this.toDoItems.find(todo => todo.id === id);
  }

  public getRefreshingItems(scheduler?: IScheduler): Observable<ToDoItem[]> {
    return interval(5000, scheduler).pipe(map(() => [...this.toDoItems]));
  }
}
