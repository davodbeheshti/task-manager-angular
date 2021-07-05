import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ShowTaskComponent } from './show-task/show-task.component';
import { TaskDefinitaionComponent } from './task-definitaion/task-definitaion.component';

const routes: Routes = [
  { path: 'definitationTask', component: TaskDefinitaionComponent },
  // { path: 'showTasks', component: ShowTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
