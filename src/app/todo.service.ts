import { Injectable } from '@angular/core';
import Dexie from "dexie";
import {Todo} from "./todo";
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends Dexie {
  todos!: Dexie.Table<Todo, string>;

  constructor() {
    super('todo-db');

    this.version(1).stores({
      todos: 'id'
    });
  }

  getAll(): Promise<Todo[]> {
    return this.todos.toArray();
  }

  add(title: string): Promise<unknown> {
    return this.todos.add({ title, id: v4(), done: false });
  }
}
