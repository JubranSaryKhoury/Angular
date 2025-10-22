import { Injectable } from '@angular/core';
import { type NewTaskData } from './task/task.model';

// by adding this(@Injectable shown below) decorator... now the angular is aware of this service and can create such instances when you need it
// (continue) and most importantly it will only create and re-use one instance so that different components operate on the same
// (continue) object on memory and therefor on the same data
//... now we need to use this service in multiple component, because this is the main purpose of add a service.(we create this logic once and we use it in multiple components)
// This service is used in the new-task-component

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  // this function (constructor) is automatically executed when the apps starts
  constructor() {
    const tasks = localStorage.getItem('tasks'); // get the items from the local storage in which they are stored under the 'tasks' key

    // if there tasks , then
    if (tasks) {
      this.tasks = JSON.parse(tasks); // if there no tasks .. then keep the original ones, but if founds a tasks .. then overwrite the original ones with those stored in the local storage ... one thing is remaining --> update the tasks thats stored in the local storage (when adding or removing a task) by adding a helper method shown below called 'saveTasks()'
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks(); // update the local storage after adding a task
  }

  // private because we need this method only inside the service ... and this method to be called after removing a task or when adding a task  (in 'addTask' and 'removeTask' methods)
  private saveTasks() {
    // set the item on the same key 'tasks' , of course write or read shall be done on the same key
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // then thats will be stored in the local storage
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks(); // update the local storage after deleting a task
  }
}
