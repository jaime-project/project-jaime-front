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

  subscription: Subscription | null = null
  cronsShort: CronShort[] = []
  cronsStatus: string[] = []

  constructor(private cronService: CronService) { }

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''

  orderFunction(): CronShort[] {

    let list: CronShort[] = this.cronsShort

    switch (this.orderBy.toLowerCase()) {
      case 'name':
        list = this.cronsShort.sort((a, b) => a.name.localeCompare(b.name))
      case 'cron':
        list = this.cronsShort.sort((a, b) => a.cron_expression.localeCompare(b.cron_expression))
      case 'status':
        list = this.cronsShort.sort((a, b) => a.status.localeCompare(b.status))
      case 'creationdate':
        list = this.cronsShort.sort((a, b) => a.creation_date.localeCompare(b.creation_date))
    }

    if (this.reverse) {
      list = list.reverse()
    }

    return list
  }

  changeOrder(order: string) {
    this.reverse = !this.reverse
    this.orderBy = order.toLowerCase()
  }

  changeFilter(filter: string) {
    this.filterBy = filter
  }

  filterFunction() {
    if (!this.filterBy) {
      return this.cronsShort
    }

    return this.cronsShort
      .filter(a => {
        return a.name.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.cron_expression.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.status.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.creation_date.toLowerCase().includes(this.filterBy.toLowerCase())
      })
  }

  ngOnInit(): void {

    this.loadStartData()

    this.subscription = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });

    this.cronService.getCronStatus()
      .subscribe(data => {
        this.cronsStatus = data.sort();
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  loadStartData() {
    this.cronService.getCronsAllShort()
      .subscribe(data => {
        this.cronsShort = data;
        this.cronsShort = this.orderFunction();
        this.cronsShort = this.filterFunction();
      })
  }

  deleteCron(id: string) {
    Swal.fire({
      title: $localize`Delete cron`,
      text: $localize`Delete cron with id ${id}`,
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
      title: $localize`Delete crons`,
      text: $localize`Delete crons with status ${status}`,
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
      title: $localize`Change status`,
      text: $localize`Change cron status with status ${status}?`,
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
