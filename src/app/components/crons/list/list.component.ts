import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CronShort } from 'src/app/models/models';
import { CronService } from 'src/app/services/crons/cron.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cron',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListCronComponent implements OnInit {

  thread: Subscription | null = null

  cronsShort: CronShort[] = []

  cronsStatus: string[] = []

  constructor(private cronService: CronService) { }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });

    this.cronService.getCronStatus()
      .subscribe(data => {
        console.log(data)
        this.cronsStatus = data.sort();
      })
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.cronService.getCronsAllShort()
      .subscribe(data => {
        this.cronsShort = data;
      })
  }

  deleteCron(id: string) {
    Swal.fire({
      title: 'Delete cron',
      text: 'Delete cron with id "' + id + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cronService.deleteCron(id)
          .subscribe()
      }
    })
  }

  deleteByStatus(status: string) {
    Swal.fire({
      title: 'Delete crons',
      text: 'Delete crons with status "' + status + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cronService.deleteCronsByStatus(status)
          .subscribe()
      }
    })
  }

  changeStatus(id: string, status: string) {
    Swal.fire({
      title: 'Change status',
      text: `Change cron status with status ${status}?`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cronService.changeStatus(id, status)
          .subscribe()
      }
    })
  }



}
