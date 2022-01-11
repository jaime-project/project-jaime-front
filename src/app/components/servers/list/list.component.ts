import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ServerShort } from 'src/app/models/models';
import { ServersService } from 'src/app/services/servers/servers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-server',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListServerComponent implements OnInit {

  listServersShorts: ServerShort[] = []
  testServerLoad: boolean = false

  constructor(private serversService: ServersService) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.serversService.listServers()
      .subscribe(data => {
        this.listServersShorts = data;
      })
  }

  testServer(name: string) {

    this.testServerLoad = true
    this.serversService.testServer(name)
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
      title: 'Delete server',
      text: 'Delete server with name "' + name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.serversService.deleteServer(name)
          .subscribe(() => {
            window.location.reload()
          })
      }
    })
  }

}
