import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { ItableShowTask } from '../../Model/m-tableShowTask';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
})
export class TableTasksComponent implements OnInit {
  notStart: number = 0;
  doing: number = 0;
  finished: number = 0;
  message: Message[] = [];
  ref: DynamicDialogRef;

  // int shalfkasf;

  changeStatus = '1';

  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private taskService: TaskServiceService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public fb: FormBuilder
  ) {}

  clickRemoveTask(i: number, item) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete? <span class="text-warning ml-4">${item.titleTask}</span>`,
      header: 'delete Task',
      accept: () => {
        this.message = [
          {
            severity: 'danger',
            summary: 'Confirmed',
            detail: `The task ${item.titleTask} deleted`,
          },
        ];
        (this.form.controls.arrayLoopCustomer as FormArray).removeAt(i);
      },
      reject: () => {
        this.message = [
          {
            severity: 'success',
            summary: 'Rejected',
            detail: `The task ${item.titleTask} not deleted`,
          },
        ];
      },
    });
  }

  listTasks: any[] = [
    {
      titleTask: 'test1',
      taskDefinitaion: 'test1',
      taskStatus: 'doing',
    },
    {
      titleTask: 'test2',
      taskDefinitaion: 'test2',
      taskStatus: 'finished',
    },
    {
      titleTask: 'test3',
      taskDefinitaion: 'test3',
      taskStatus: 'doing',
    },
    {
      titleTask: 'test4',
      taskDefinitaion: 'test4',
      taskStatus: 'notStarte',
    },
  ];

  form: FormGroup = new FormGroup({
    // statusTask: new FormControl(''),
    arrayLoopCustomer: new FormArray([]),
  });

  first = 0;
  rows = 10;
  totalRecords = 10;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.taskService.tasks.subscribe((data) => {
      (this.form.controls.arrayLoopCustomer as FormArray).push(
        this.fb.group({
          titleTask: data.titleTask,
          taskDefinitaion: data.taskDefinitaion,
          taskStatus: data.status,
        })
      );
      console.log(data);
    });
  }

  arrayLoopFunction(form) {
    return (form = this.form.controls.arrayLoopCustomer.value);
  }

  clickShowModalEdit(item: any, i) {
    this.ref = this.dialogService.open(EditTaskComponent, {
      header: 'Edite Task',
      width: '40%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { ...item },
    });
    this.ref.onClose.subscribe((data) => {
      this.form.controls.arrayLoopCustomer.value[i].titleTask = data.titleTask;
      this.form.controls.arrayLoopCustomer.value[i].taskDefinitaion =
        data.taskDefinitaion;
    });
  }

  ////// change radioButton

  changeDoing(i) {
    console.log(i);
    
  }

  changeFinished(i) {
    console.log(i);
    
  }

  changeNotStarted(i) {
    console.log(i);
    
  }

  ///////////////////////////////
  ///// chart js
  ////////////////////////////////////////////
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartPlugins: any = [pluginDataLabels];
}
