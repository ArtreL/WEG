import { Component, OnInit } from '@angular/core';
import { ToDoItem, ToDoItemCreationData } from '../todo-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoRepository } from '../todo-repository.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  public toDoForm: FormGroup;

  public isLoggedIn = false;

  private authSubscription: Subscription;

  constructor(private fb: FormBuilder, private repository: TodoRepository, private oAuthService: OAuthService) {
    this.createForm();
  }

  ngOnInit() {
    this.authSubscription = this.oAuthService.events.subscribe(() => this.updateAuthState());
    this.updateAuthState();
  }

  private updateAuthState() {
    this.isLoggedIn = this.oAuthService.hasValidAccessToken();
  }

  createForm() {
    this.toDoForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]],
      completeUntil: new Date()
    });
  }

  submit() {
    const value = this.toDoForm.value;
    const toDoItem: ToDoItemCreationData = {
      text: value.text,
      completeUntil: value.completeUntil
    };
    this.repository.add(toDoItem).subscribe();

    this.toDoForm.reset();
    this.toDoForm.patchValue({
      completeUntil: new Date()
    });
  }

  get text() {
    return this.toDoForm.get('text');
  }

  get name() {
    return this.toDoForm.get('person').get('name');
  }

  get email() {
    return this.toDoForm.get('person').get('email');
  }

}
