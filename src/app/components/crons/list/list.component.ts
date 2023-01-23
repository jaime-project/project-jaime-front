import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  pageLoading: boolean = true
  subscription: Subscription | null = null
  cronsShort: CronShort[] = []
  cronsStatus: string[] = []

  constructor(private cronService: CronService, private toastr: ToastrService) { }

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''
  page: number = 1
  size: number = 10

  changeOrder(order: string) {
    this.reverse = !this.reverse
    this.orderBy = order.toLowerCase()
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
    this.cronService.getCronsAllShort(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {
        this.cronsShort = data;
        if (this.reverse) {
          this.cronsShort = data.reverse()
        }
        this.pageLoading = false
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
          .subscribe(() => {
            this.toastr.success($localize`Cron deleted`)
          })
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
          .subscribe(() => {
            this.toastr.success($localize`Crons deleted`)
          })
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
          .subscribe(() => {
            this.toastr.success($localize`Cron changed status to ${status}`)
          })
      }
    })
  }



}
