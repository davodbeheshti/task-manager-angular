import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ItableShowTask } from '../Model/m-tableShowTask';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }
  public tasks = new Subject<ItableShowTask>();

  addTasks(data : ItableShowTask) {
    this.tasks.next(data)
  }

}
