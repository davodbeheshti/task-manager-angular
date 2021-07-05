import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private ref : DynamicDialogRef , public dinamicDialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    titleTask: new FormControl(this.dinamicDialogConfig.data.titleTask),
    taskDefinitaion: new FormControl(this.dinamicDialogConfig.data.taskDefinitaion)
  })

  clickApplyChanges() {
    this.ref.close(this.form.value);
  }

}
