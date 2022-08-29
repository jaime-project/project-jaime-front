import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private serversService: ServerService, private route: Router) { }

  orderBy: string = 'host'
  reverse: boolean = false
  filterBy: string = ''

  orderFunction(): ServerShort[] {

    let list: ServerShort[] = this.listServersShorts

    switch (this.orderBy.toLowerCase()) {
      case 'host':
        list = this.listServersShorts.sort((a, b) => a.host.localeCompare(b.host))
        break
      case 'port':
        list = this.listServersShorts.sort((a, b) => a.port.localeCompare(b.port))
        break
      case 'name':
        list = this.listServersShorts.sort((a, b) => a.name.localeCompare(b.name))
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
      return this.listServersShorts
    }

    return this.listServersShorts
      .filter(a => {
        return a.name.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.host.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.port.toLowerCase().includes(this.filterBy.toLowerCase())
      })
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
    this.serversService.listServer()
      .subscribe(data => {
        this.listServersShorts = data
        this.listServersShorts = this.filterFunction();
        this.listServersShorts = this.orderFunction()
      })
  }

  testServer(name: string) {

    this.testServerLoad = true
    this.serversService.testServer(name)
      .subscribe(data => {
        this.testServerLoad = false
        if (data.success) {
          Swal.fire({
            title: $localize`Login success`,
            icon: 'success',
            confirmButtonColor: '#05b281',
          })
        }
        else {
          Swal.fire({
            title: 'Login failure',
            text: data.text,
            icon: 'warning',
            confirmButtonColor: '#05b281',
          })
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
            this.route.navigate(['servers'])
          })
      }
    })
  }

}
