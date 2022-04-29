import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cluster } from 'src/app/models/models';
import { ClustersService } from 'src/app/services/clusters/clusters.service';

@Component({
  selector: 'app-detail-cluster',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailClusterComponent implements OnInit {

  cluster: Cluster = {
    name: "",
    type: "",
    token: "",
    url: "",
    version: ""
  }

  constructor(private clustersService: ClustersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')

    this.clustersService.getCluster(name)
      .subscribe((data) => {
        this.cluster = data;
      })
  }

}
