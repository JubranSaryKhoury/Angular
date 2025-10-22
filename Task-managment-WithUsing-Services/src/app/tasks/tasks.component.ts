import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
//import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],

  // element injector
  //providers: [TasksService], // here any component that's in its html file (children components)---> here the task component + the children have an access to this service ... other's not like the 'app component' because its not from its children
})
export class TasksComponent {}
