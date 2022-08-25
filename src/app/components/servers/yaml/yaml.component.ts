import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Server } from 'src/app/models/models';
import { ServerService } from 'src/app/services/servers/servers.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-server',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlServerComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""
  server: Server = {
    name: "",
    host: "",
    port: "",
    user: "",
    password: ""
  }

  constructor(private serversService: ServerService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get('name')

    this.serversService.getServer(name)
      .subscribe((data) => {
        this.server = data;

        let doc = new Document()
        doc.contents = data
        this.contentYaml = doc.toString()
      })
  }

  putServer(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update server`,
      text: $localize`Update server with name ${this.server.name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.serversService.putServer(parse(modifyYaml))
          .subscribe(() =>
            this.route.navigate(['servers'])
          )
      }
    })

  }

}
