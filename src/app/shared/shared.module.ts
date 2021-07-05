import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radioButton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDefinitaionComponent } from '../task-definitaion/task-definitaion.component';
import { ShowTaskComponent } from '../show-task/show-task.component';
import { TableTasksComponent } from '../show-task/table-tasks/table-tasks.component';

const importsComponent = [
  ReactiveFormsModule,
  CommonModule,
  ButtonModule,
  TableModule,
  TabViewModule,
  DropdownModule,
  PaginatorModule,
  RadioButtonModule,
  DynamicDialogModule,
  ConfirmDialogModule,
  MessagesModule,
  ChartsModule,
];

@NgModule({
  declarations: [TaskDefinitaionComponent , ShowTaskComponent , TableTasksComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    ...importsComponent
  ],
  exports: [
    ...importsComponent,
    TaskDefinitaionComponent,
    ShowTaskComponent,
    TableTasksComponent
  ],
})
export class SharedModule {}
