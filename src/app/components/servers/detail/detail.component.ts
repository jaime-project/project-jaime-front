import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from 'src/app/models/models';
import { ServersService } from 'src/app/services/servers/servers.service';

@Component({
  selector: 'app-detail-server',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailServerComponent implements OnInit {

  server: Server = {
    name: "",
    type: "",
    token: "",
    url: "",
    user: "",
    version: ""
  }

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let name = this.route.snapshot.paramMap.get('name')

    this.serversService.getServer(name)
      .subscribe((data) => {
        this.server = data;
      })

  }

}
