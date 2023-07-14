import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from 'src/app/models/models';
import { ServerService } from 'src/app/services/servers/servers.service';

@Component({
  selector: 'app-detail-server',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailServerComponent implements OnInit {

  server: Server = {
    name: "",
    host: "",
    port: "",
    user: "",
    password: ""
  }

  constructor(private serversService: ServerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')

    this.serversService.getServer(name)
      .subscribe((data) => {
        this.server = data;
      })
  }

}
