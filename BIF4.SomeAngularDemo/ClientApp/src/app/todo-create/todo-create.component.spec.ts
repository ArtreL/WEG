import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { TodoCreateComponent } from './todo-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoRepository } from '../todo-repository.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_URL } from '../../basUrl';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCreateComponent ],
      imports: [
        ReactiveFormsModule,
        OAuthModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        TodoRepository,
        { provide: BASE_URL, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall add new items to todo repository', () => {
    component.toDoForm.patchValue({
      text: 'Test ToDo text'
    });

    const repository = TestBed.get(TodoRepository);
    const repositorySpy = spyOn(repository, 'add').and.callThrough();

    component.submit();

    expect(repositorySpy.calls.any()).toBe(true);
  });

  it('shall have a valid form model for valid input', () => {
    component.toDoForm.patchValue({
      text: 'Test ToDo text'
    });

    expect(component.toDoForm.valid).toBe(true);
  });

  it('shall have errors for invalid form values', () => {
    component.toDoForm.patchValue({
      text: 'short'
    });

    expect(component.toDoForm.valid).toBe(false);
    expect(component.toDoForm.get('text').valid).toBe(false);
  });

});
