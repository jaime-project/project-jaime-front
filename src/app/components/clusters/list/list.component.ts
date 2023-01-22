import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
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

  pageLoading: boolean = true
  subscription: Subscription | null = null
  listClustersShorts: ClusterShort[] = []

  constructor(private clustersService: ClustersService, private route: Router, private toastr: ToastrService) { }

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
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  loadStartData() {
    this.clustersService.listCluster(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {

        this.listClustersShorts = data;
        if (this.reverse) {
          this.listClustersShorts = this.listClustersShorts.reverse()
        }
        this.pageLoading = false
      })
  }

  testServer(name: string) {

    this.pageLoading = true
    this.clustersService.testCluster(name)
      .subscribe(data => {
        this.pageLoading = false
        if (data.success) {
          this.toastr.success($localize`Connection success`)
        }
        else {
          this.toastr.error($localize`Connection failure`)
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


  exportYaml(clusterName: string) {
    this.clustersService.exportYaml(clusterName)
      .subscribe(data => {
        FileSaver.saveAs(data, `${new Date().toISOString()}.yaml`);
      })
  }


}
