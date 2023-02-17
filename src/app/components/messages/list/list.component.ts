import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { JobShort } from 'src/app/models/models';
import { JobService } from 'src/app/services/jobs/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-job',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListMessageComponent implements OnInit {

  pageLoading: boolean = true
  thread: Subscription | null = null
  jobsShort: JobShort[] = []
  messageStatus: string[] = []

  constructor(private jobService: JobService, private toastr: ToastrService) { }

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

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });

    this.jobService.getJobStatus()
      .subscribe(data => {
        this.messageStatus = data.sort();
      })
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.jobService.getJobsAllShort(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {
        this.jobsShort = data;
        if (this.reverse) {
          this.jobsShort = data.reverse()
        }
        this.pageLoading = false
      })
  }

  deleteJob(id: string) {
    Swal.fire({
      title: $localize`Delete job`,
      text: $localize`Delete job with id ${id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.jobService.deleteJob(id)
          .subscribe(() => {
            this.toastr.success($localize`Job deleted`)
          })
      }
    })
  }

  deleteByStatus(status: string) {
    Swal.fire({
      title: $localize`Delete jobs`,
      text: $localize`Delete jobs with status ${status}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.jobService.deleteJobsByStatus(status)
          .subscribe(() => {
            this.toastr.success($localize`Jobs deleted`)
          })
      }
    })
  }

  changeStatus(id: string, status: string) {
    Swal.fire({
      title: $localize`Change status`,
      text: $localize`Change job with status ${status}?`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.jobService.changeStatus(id, status)
          .subscribe(() => {
            this.toastr.success($localize`Job status changed`)
          })
      }
    })
  }



}
