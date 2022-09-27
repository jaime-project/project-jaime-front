import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { ClusterShort } from 'src/app/models/models';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cluster',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListClusterComponent implements OnInit {

  pageLoading: boolean = false
  subscription: Subscription | null = null
  listClustersShorts: ClusterShort[] = []

  constructor(private clustersService: ClustersService, private route: Router, private toastr: ToastrService) { }

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''

  orderFunction(): ClusterShort[] {

    let list: ClusterShort[] = []

    switch (this.orderBy.toLowerCase()) {
      case 'name':
        list = this.listClustersShorts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'type':
        list = this.listClustersShorts.sort((a, b) => a.type.localeCompare(b.type))
        break
      case 'url':
        list = this.listClustersShorts.sort((a, b) => a.url.localeCompare(b.url))
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
      return this.listClustersShorts
    }

    return this.listClustersShorts
      .filter(a => {
        return a.name.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.type.toLowerCase().includes(this.filterBy.toLowerCase())
          || a.url.toLowerCase().includes(this.filterBy.toLowerCase())
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
    this.clustersService.listCluster()
      .subscribe(data => {
        this.listClustersShorts = data;
        this.listClustersShorts = this.orderFunction();
        this.listClustersShorts = this.filterFunction();
      })
  }

  testServer(name: string) {

    this.pageLoading = true
    this.clustersService.testCluster(name)
      .subscribe(data => {
        this.pageLoading = false
        if (data.success) {
          this.toastr.success($localize`Login success`)
        }
        else {
          this.toastr.error($localize`Login failure`)
        }
      })
  }

  deleteServer(name: string) {
    Swal.fire({
      title: `Delete cluster`,
      text: $localize`Delete cluster with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.clustersService.deleteCluster(name)
          .subscribe(() => {
            this.toastr.success($localize`Delete cluster success`)
            this.route.navigate(['clusters'])
          })
      }
    })
  }


}
