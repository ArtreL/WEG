import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ToDoItem } from '../todo-item';
import { TodoRepository } from '../todo-repository.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public toDoItems$: Observable<ToDoItem[]>;

  constructor(toDoRepository: TodoRepository) {
    this.toDoItems$ = toDoRepository.todoItems$;
  }

  ngOnInit() {
  }

}
