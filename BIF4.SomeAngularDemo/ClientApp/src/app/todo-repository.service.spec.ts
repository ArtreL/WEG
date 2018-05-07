import { TestBed, inject } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { VirtualTimeScheduler } from 'rxjs/scheduler/VirtualTimeScheduler';

import { TodoRepository } from './todo-repository.service';
import { ToDoItem } from './todo-item';
import { deepEqual } from 'assert';
import { VirtualAction } from 'rxjs/scheduler/VirtualTimeScheduler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_URL } from '../basUrl';

describe('TodoRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoRepository,
        { provide: BASE_URL, useValue: '/' }
      ]
    });
  });

  it('should be created', inject([TodoRepository], (service: TodoRepository) => {
    expect(service).toBeTruthy();
  }));

});
