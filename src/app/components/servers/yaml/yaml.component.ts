import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from 'src/app/models/models';
import { ServersService } from 'src/app/services/servers/servers.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-yaml-server',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlServerComponent implements OnInit {

  contentYaml: string = ""
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

        let doc = new Document()
        doc.contents = data
        this.contentYaml = doc.toString()
      })
  }

}
