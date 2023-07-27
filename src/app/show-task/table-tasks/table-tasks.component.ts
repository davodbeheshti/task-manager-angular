import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  listTask = [];
  refreshTable: boolean = true;

  // int shalfkasf;

  changeStatus = '1';

  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private taskService: TaskServiceService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.listTask = JSON.parse(window.localStorage.getItem('tasks'))
  }

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
        window.localStorage.setItem('tasks', JSON.stringify(this.form.controls.arrayLoopCustomer.value));
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

  form: FormGroup = new FormGroup({
    // statusTask: new FormControl(''),
    arrayLoopCustomer: new FormArray([]),
  });

  first = 0;
  rows = 10;
  totalRecords = 10;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.listTask.map(data => {
      this.tasks(data)
    })

    this.taskService.tasks.subscribe((data) => {
      this.tasks(data)
    });
  }

  tasks(data) {
    (this.form.controls.arrayLoopCustomer as FormArray).push(
      this.fb.group({
        titleTask: data.titleTask,
        taskDefinitaion: data.taskDefinitaion,
        status: data.status,
        id: data.id
      })
    )
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
      if (data) {
        this.refreshTable = false;
        this.form.get("arrayLoopCustomer").value[i] = data;
        console.log(this.form.get('arrayLoopCustomer').value);
        window.localStorage.setItem('tasks', JSON.stringify(this.form.controls.arrayLoopCustomer.value))
        setTimeout(() => {
          this.refreshTable = true;
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }

  ////// change radioButton

  changeDoing() {
    window.localStorage.setItem('tasks', JSON.stringify(this.form.controls.arrayLoopCustomer.value))
  }

  changeFinished() {
    window.localStorage.setItem('tasks', JSON.stringify(this.form.controls.arrayLoopCustomer.value))
  }

  changeNotStarted() {
    window.localStorage.setItem('tasks', JSON.stringify(this.form.controls.arrayLoopCustomer.value))
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
