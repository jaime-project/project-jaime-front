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
export class ListJobComponent implements OnInit {

  pageLoading: boolean = true

  thread: Subscription | null = null

  jobsShort: JobShort[] = []

  jobsStatus: string[] = []

  constructor(private jobService: JobService, private toastr: ToastrService) { }

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''

  orderFunction(): JobShort[] {

    if (this.reverse) {
      this.jobsShort = this.jobsShort.reverse()
    }

    return this.jobsShort
  }

  changeOrder(order: string) {
    this.reverse = !this.reverse
    console.log(this.reverse)
    this.orderBy = order.toLowerCase()
  }

  // filterFunction() {
  //   if (!this.filterBy) {
  //     return this.jobsShort
  //   }

  //   return this.jobsShort
  //     .filter(a => {
  //       return a.name.toLowerCase().includes(this.filterBy.toLowerCase())
  //         || a.id.toLowerCase().includes(this.filterBy.toLowerCase())
  //         || a.status.toLowerCase().includes(this.filterBy.toLowerCase())
  //         || a.module_name.toLowerCase().includes(this.filterBy.toLowerCase())
  //         || a.agent_id?.toLowerCase().includes(this.filterBy.toLowerCase())
  //         || a.agent_type.toLowerCase().includes(this.filterBy.toLowerCase())
  //     })
  // }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });

    this.jobService.getJobStatus()
      .subscribe(data => {
        this.jobsStatus = data.sort();
      })
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.jobService.getJobsAllShort(5, 1, this.filterBy, this.orderBy)
      .subscribe(data => {
        this.jobsShort = data;
        // this.jobsShort = this.filterFunction();
        this.jobsShort = this.orderFunction();

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
