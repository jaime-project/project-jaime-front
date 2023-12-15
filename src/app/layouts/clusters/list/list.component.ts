import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { ClusterShort } from 'src/app/models/models';
import { AgentService } from 'src/app/services/agents/agents.service';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cluster',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListClusterComponent implements OnInit {

  @ViewChild('closeModalButton')
  closeModalButton: any;

  pageLoading: boolean = true
  listClustersShorts: ClusterShort[] = []

  listAgentTypes: string[] = []
  currentCluster: string = ""
  currentAgentType: string = ""

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''
  page: number = 1
  size: number = 10

  constructor(private clustersService: ClustersService, private agentService: AgentService, private route: Router, private toastr: ToastrService) { }

  changeOrder(order: string) {
    this.reverse = !this.reverse
    this.orderBy = order.toLowerCase()
  }

  ngOnInit(): void {
    this.loadStartData()
  }


  loadStartData() {

    this.clustersService.listCluster(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {

        this.listClustersShorts = data;
        if (this.reverse) {
          this.listClustersShorts = data.reverse()
        }
        this.pageLoading = false
      })

    this.agentService.listAgentsTypes()
      .subscribe(data => {
        this.listAgentTypes = data;
      })
  }

  testServer() {

    this.closeModalButton.nativeElement.click();

    this.pageLoading = true
    this.clustersService.testCluster(this.currentCluster, this.currentAgentType)
      .subscribe(data => {
        this.pageLoading = false
        if (data.success) {
          this.toastr.success($localize`Connection success`)
        }
        else {
          this.toastr.error(data.text, $localize`Connection failure`)
        }
      })
  }

  deleteServer(name: string) {
    Swal.fire({
      title: `Delete cluster`,
      text: $localize`Delete cluster with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.clustersService.deleteCluster(name)
          .subscribe(() => {
            this.toastr.success($localize`Delete cluster success`)
            this.route.navigate(['clusters'])
          })
      }
    })
  }

  changeCurrentClusterToTest(name: string) {
    this.currentCluster = name
  }

  exportYaml(clusterName: string) {
    this.clustersService.exportYaml(clusterName)
      .subscribe(data => {
        FileSaver.saveAs(data, `${new Date().toISOString()}.yaml`);
      })
  }


}
