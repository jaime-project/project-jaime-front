import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal, private workService: WorkService) { }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.workService.getWorksAllShort()
      .subscribe(data => {
        this.worksShort = data;
      })
  }

  deleteWork(id: string) {
    Swal.fire({
      title: 'Delete work',
      text: 'Delete work with id "' + id + '"',
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
      title: 'Delete works',
      text: 'Delete works with status "' + status + '"',
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

  resetStatus(id: string) {
    Swal.fire({
      title: 'Reset status',
      text: 'Reset work status with status READY?',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.workService.resetStatus(id)
          .subscribe()
      }
    })
  }



}
