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

  addingTask() {
    return this.fb.group({
      titleTask: this.form.controls.titleTask.value,
      taskDefinitaion: this.form.controls.taskDefinitaion.value,
      taskStatus: this.form.controls.status.value,
    });
  }

  clickAddTask() {
    console.log(this.form.value);
    const task = JSON.parse(window.localStorage.getItem('tasks')) || [];
    task.push(this.form.value);
    window.localStorage.setItem('tasks' , JSON.stringify(task))
    this.taskService.addTasks(this.form.value);
    this.form.controls.titleTask.setValue('');
    this.form.controls.taskDefinitaion.setValue('');
    this.form.controls.status.setValue('');
  }
}
