import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormArrayName,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITaskStatus } from '../Model/m-tableShowTask';
import { TaskServiceService } from '../service/task-service.service';
import * as uuid from 'uuid';


@Component({
  selector: 'app-task-definitaion',
  templateUrl: './task-definitaion.component.html',
  styleUrls: ['./task-definitaion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskDefinitaionComponent implements OnInit {
  optionDropDown: ITaskStatus[];

  constructor(public fb: FormBuilder, private taskService: TaskServiceService) {
    this.optionDropDown = [
      { taskStatus: 'Doing', value: 'doing' },
      { taskStatus: 'Finished', value: 'finished' },
      { taskStatus: 'NotStarted', value: 'notStarted' },
    ];
  }

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    titleTask: new FormControl('', Validators.required),
    taskDefinitaion: new FormControl(''),
    status: new FormControl('', Validators.required),
  });

  clickAddTask() {
    const {titleTask,taskDefinitaion,status} = this.form.value;
    const task = {
      titleTask,
      taskDefinitaion,
      status,
      id : uuid.v4(),
    }
    const taskList = JSON.parse(window.localStorage.getItem('tasks')) || [];
    taskList.push(task);
    window.localStorage.setItem('tasks' , JSON.stringify(taskList))
    this.taskService.addTasks(this.form.value);
    this.form.controls.titleTask.setValue('');
    this.form.controls.taskDefinitaion.setValue('');
    this.form.controls.status.setValue('');
  }
}
