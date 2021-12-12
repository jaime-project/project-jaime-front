import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal, private serversService: ServersService) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(1000)
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

  deleteServer(modal: string, name: string) {

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
