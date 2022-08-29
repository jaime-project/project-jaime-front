import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { WorkShort } from 'src/app/models/models';
import { WorkService } from 'src/app/services/works/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-work',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListWorkComponent implements OnInit {

  thread: Subscription | null = null

  worksShort: WorkShort[] = []

  worksStatus: string[] = []

  constructor(private workService: WorkService) { }

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''

  orderFunction(): WorkShort[] {

    let list: WorkShort[] = this.worksShort

    console.log(this.orderBy.toLowerCase())
    switch (this.orderBy.toLowerCase()) {
      case 'name':
        list = this.worksShort.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'status':
        list = this.worksShort.sort((a, b) => a.status.localeCompare(b.status))
        break
      case 'id':
        list = this.worksShort.sort((a, b) => a.id.localeCompare(b.id))
        break
      case 'agentid':
        list = this.worksShort.sort((a, b) => {
          if (a.agent_id) {
            return a.agent_id.localeCompare(b.agent_id)
          }
          return 0
        })
        break
      case 'agenttype':
        list = this.worksShort.sort((a, b) => a.agent_type.localeCompare(b.agent_type))
        break
      case 'module':
        list = this.worksShort.sort((a, b) => a.module_name.localeCompare(b.module_name))
        break
      case 'startdate':
        list = this.worksShort.sort((a, b) => {
          if (a.start_date && b.start_date) {
            return a.start_date.localeCompare(b.start_date)
          }
          return 0
        })
        break 
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

  filterFunction() {
    if (!this.filterBy) {
      return this.worksShort
    }

    return this.worksShort
      .filter(a => {
        return a.name.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.id.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.status.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.module_name.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.agent_id?.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.agent_type.toLowerCase().includes(this.filterBy.toLowerCase())
      })
  }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });

    this.workService.getWorkStatus()
      .subscribe(data => {
        this.worksStatus = data;
      })
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.workService.getWorksAllShort()
      .subscribe(data => {
        this.worksShort = data;
        this.worksShort = this.filterFunction();
        this.worksShort = this.orderFunction();
      })
  }

  deleteWork(id: string) {
    Swal.fire({
      title: $localize`Delete work`,
      text: $localize`Delete work with id ${id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.workService.deleteWork(id)
          .subscribe()
      }
    })
  }

  deleteByStatus(status: string) {
    Swal.fire({
      title: $localize`Delete works`,
      text: $localize`Delete works with status ${status}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.workService.deleteWorksByStatus(status)
          .subscribe()
      }
    })
  }

  changeStatus(id: string, status: string) {
    Swal.fire({
      title: $localize`Change status`,
      text: $localize`Change work with status ${status}?`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.workService.changeStatus(id, status)
          .subscribe()
      }
    })
  }



}
