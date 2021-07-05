import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ShowTaskComponent } from './show-task.component';
import { TableTasksComponent } from './table-tasks/table-tasks.component';
import { EditTaskComponent } from './table-tasks/edit-task/edit-task.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ EditTaskComponent ],
  imports: [CommonModule , SharedModule],
  exports: [ EditTaskComponent ]
})
export class ShowTasksModule {}
