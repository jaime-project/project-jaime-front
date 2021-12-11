import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServersService } from 'src/app/services/servers/servers.service';

@Component({
  selector: 'app-list-server',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListServerComponent implements OnInit {

  private listServers: String[] = []

  constructor(private modalService: NgbModal, private serversService: ServersService) { }

  ngOnInit(): void {
    this.serversService.listServers()
      .subscribe((data) => {
        this.listServers = data;
        console.log(this.listServers)
      })

  }

  openVerticallyCentered(content3: string) {
    this.modalService.open(content3, { centered: true });
  }

}
