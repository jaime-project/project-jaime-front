import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cluster } from 'src/app/models/models';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-cluster',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlClusterComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""
  cluster: Cluster = {
    name: "",
    type: "",
    token: "",
    url: "",
  }

  constructor(private clustersService: ClustersService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get('name')

    this.clustersService.getCluster(name)
      .subscribe((data) => {
        this.cluster = data;

        let doc = new Document()
        doc.contents = data
        this.contentYaml = doc.toString()
      })
  }

  putServer(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update cluster`,
      text: $localize`Update cluster with name ${this.cluster.name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.clustersService.putCluster(parse(modifyYaml))
          .subscribe(() =>{
            this.toastr.success($localize`Cluster updated`)
            this.route.navigate(['clusters'])
          })
      }
    })

  }

}
