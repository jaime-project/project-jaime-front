import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  listClustersShorts: ClusterShort[] = []
  testServerLoad: boolean = false

  constructor(private clustersService: ClustersService, private route: Router) { }

  thread: Subscription | null = null

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.clustersService.listCluster()
      .subscribe(data => {
        this.listClustersShorts = data.sort().reverse();
      })
  }

  testServer(name: string) {

    this.testServerLoad = true
    this.clustersService.testCluster(name)
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
            title: $localize`Login failure`,
            text: data.text,
            icon: 'warning',
            confirmButtonColor: '#05b281',
          })
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
            this.route.navigate(['clusters'])
          })
      }
    })
  }

}
