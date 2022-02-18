import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Server } from 'src/app/models/models';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-cluster',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlServerComponent implements OnInit {

  contentYaml: string = ""
  cluster: Server = {
    name: "",
    type: "",
    token: "",
    url: "",
    version: ""
  }

  constructor(private clustersService: ClustersService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get('name')

    this.clustersService.getServer(name)
      .subscribe((data) => {
        this.cluster = data;

        let doc = new Document()
        doc.contents = data
        this.contentYaml = doc.toString()
      })
  }

  putServer(modifyYaml: string) {

    Swal.fire({
      title: 'Update cluster',
      text: 'Update cluster with name "' + this.cluster.name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.clustersService.putServer(parse(modifyYaml))
          .subscribe(() =>
            this.route.navigate(['clusters'])
          )
      }
    })

  }

}
