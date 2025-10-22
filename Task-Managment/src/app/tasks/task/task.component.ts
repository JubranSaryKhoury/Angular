// this component manages a single task

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

// interface Task {
//   id: string;
//   userId: string;
//   title: string;
//   summary: string;
//   dueDate: string;      // moved to the task.model.ts file
// }

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  // @Output() complete = new EventEmitter<string>();

  private tasksService = inject(TasksService); // or by using the constructor (constructor or the inject method)
  // TasksService is the class in which it will be injected (or in which you want an instance that will be injected)

  onCompleteTask() {
    this.tasksService.removeTask(this.task.id); // task --> we have the entry task (defined in above in 'TaskComponent' as @Input)

    // now we dont need to the 'EventEmitter' nor the '@Output' (both are imported above)  ... since this component dont need any more to emit any events
  }
}
