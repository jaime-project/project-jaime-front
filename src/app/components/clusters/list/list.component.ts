import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ServerShort } from 'src/app/models/models';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cluster',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListServerComponent implements OnInit {

  listServersShorts: ServerShort[] = []
  testServerLoad: boolean = false

  constructor(private clustersService: ClustersService, private route: Router) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.clustersService.listServers()
      .subscribe(data => {
        this.listServersShorts = data.sort().reverse();
      })
  }

  testServer(name: string) {

    this.testServerLoad = true
    this.clustersService.testServer(name)
      .subscribe(data => {
        this.testServerLoad = false
        if (data.success) {
          Swal.fire({
            title: 'Login success',
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
      title: 'Delete cluster',
      text: 'Delete cluster with name "' + name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.clustersService.deleteServer(name)
          .subscribe(() => {
            this.route.navigate(['clusters'])
          })
      }
    })
  }

}
