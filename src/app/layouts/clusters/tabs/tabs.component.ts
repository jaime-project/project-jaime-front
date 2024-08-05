import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClustersService } from 'src/app/services/clusters/clusters.service';

@Component({
  selector: 'app-tabs-cluster',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsClusterComponent implements OnInit {

  selectedTabId = 1
  clusterName: string = ""


  constructor(private clustersService: ClustersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id')

    this.clustersService.getCluster(id).subscribe(data => {
      this.clusterName = data.name
    })

  }

}
