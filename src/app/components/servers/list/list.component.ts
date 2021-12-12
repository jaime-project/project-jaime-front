import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { ServerShort } from 'src/app/models/models';
import { ServersService } from 'src/app/services/servers/servers.service';

@Component({
  selector: 'app-list-server',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListServerComponent implements OnInit {

  listServersShorts: ServerShort[] = []

  constructor(private modalService: NgbModal, private serversService: ServersService) { }

  ngOnInit(): void {

    interval(1000)
      .subscribe(() => {
        this.serversService.listServers()
          .subscribe(data => {
            this.listServersShorts = data;
          })
      });
  }

  openVerticallyCentered(content3: string) {
    this.modalService.open(content3, { centered: true });
  }

}
