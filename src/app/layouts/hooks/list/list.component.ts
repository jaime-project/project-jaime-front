import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { HookShort } from 'src/app/models/models';
import { AppConfigService } from 'src/app/services/AppConfigService';
import { HookService } from 'src/app/services/hooks/hook.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-hook',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListHookComponent implements OnInit {

  pageLoading: boolean = true
  subscription: Subscription | null = null
  hooksShort: HookShort[] = []
  hooksStatus: string[] = []
  jaimeHookURL: string = ""

  constructor(private hookService: HookService, private toastr: ToastrService, private appConfigService: AppConfigService) {
    this.jaimeHookURL = appConfigService.config.backendURL + '/api/v1/hooks'
  }

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

    this.hookService.getHookStatus()
      .subscribe(data => {
        this.hooksStatus = data.sort();
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  loadStartData() {
    this.hookService.getHooksAllShort(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {
        this.hooksShort = data;
        if (this.reverse) {
          this.hooksShort = data.reverse()
        }
        this.pageLoading = false
      })
  }

  deleteHook(id: string) {
    Swal.fire({
      title: $localize`Delete hook`,
      text: $localize`Delete hook with id ${id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.hookService.deleteHook(id)
          .subscribe(() => {
            this.toastr.success($localize`Hook deleted`)
          })
      }
    })
  }

  deleteByStatus(status: string) {
    Swal.fire({
      title: $localize`Delete hooks`,
      text: $localize`Delete hooks with status ${status}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.hookService.deleteHooksByStatus(status)
          .subscribe(() => {
            this.toastr.success($localize`Hooks deleted`)
          })
      }
    })
  }

  changeStatus(id: string, status: string) {
    Swal.fire({
      title: $localize`Change status`,
      text: $localize`Change hook status with status ${status}?`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.hookService.changeStatus(id, status)
          .subscribe(() => {
            this.toastr.success($localize`Hook changed status to ${status}`)
          })
      }
    })
  }

  goTo(id: String) {
    window.open(`${this.jaimeHookURL}/${id}`, "_blank");
  }



}
