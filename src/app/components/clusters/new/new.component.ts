import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agents/agents.service';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-cluster',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewClusterComponent implements OnInit {

  clusterForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    token: new FormControl(''),
    type: new FormControl(''),
    version: new FormControl(''),
  });

  constructor(private route: Router, private agentService: AgentService, private clustersService: ClustersService) { }

  clusterTypes: string[] = []

  ngOnInit(): void {

    this.agentService.listAgentsTypes()
      .subscribe(data => {
        this.clusterTypes = data.sort()
      })
  }

  postCluster() {
    this.clustersService.postCluster(this.clusterForm.value)
      .subscribe(() => {
        Swal.fire({
          title: $localize`New Server created`,
          icon: 'success',
        }).then(() =>
          this.route.navigate(['clusters'])
        )
      })
  }

}
