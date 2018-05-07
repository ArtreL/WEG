import { Person } from './person';

export class ToDoItem {
  id = 0;
  name = '';
  email = '';
}

export class ToDoItemCreationData {
  text = '';
  completeUntil = new Date();
}
