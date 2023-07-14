import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { ServerShort } from 'src/app/models/models';
import { ServerService } from 'src/app/services/servers/servers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-server',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListServerComponent implements OnInit {

  subscription: Subscription | null = null

  listServersShorts: ServerShort[] = []
  testServerLoad: boolean = false
  pageLoading: boolean = true

  constructor(private serversService: ServerService, private route: Router, private toastr: ToastrService) { }

  orderBy: string = 'host'
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
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  loadStartData() {
    this.serversService.listServer(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {
        this.listServersShorts = data
        if (this.reverse) {
          this.listServersShorts = this.listServersShorts.reverse()
        }
        this.pageLoading = false
      })
  }

  testServer(name: string) {

    this.testServerLoad = true
    this.serversService.testServer(name)
      .subscribe(data => {
        this.testServerLoad = false
        if (data.success) {
          this.toastr.success($localize`Connection succcess`)
        }
        else {
          this.toastr.error($localize`Connection failure`)
        }
      })
  }

  deleteServer(name: string) {

    Swal.fire({
      title: $localize`Delete server`,
      text: $localize`Delete server with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.serversService.deleteServer(name)
          .subscribe(() => {
            this.toastr.success($localize`Server deleted`)
            this.route.navigate(['servers'])
          })
      }
    })
  }

  exportYaml(serverName: string) {
    this.serversService.exportYaml(serverName)
      .subscribe(data => {
        FileSaver.saveAs(data, `${new Date().toISOString()}.yaml`);
      })
  }

}
