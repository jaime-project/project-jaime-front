import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/services/agents/agents.service';
import { ClustersService } from 'src/app/services/clusters/clusters.service';

@Component({
  selector: 'app-new-cluster',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewClusterComponent implements OnInit {

  clusterForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    url: new UntypedFormControl(''),
    token: new UntypedFormControl(''),
    type: new UntypedFormControl(''),
  });

  constructor(private route: Router, private agentService: AgentService, private clustersService: ClustersService, private toastr: ToastrService, private hotkeysService: HotkeysService) {
    this.hotkeysService.add(new Hotkey(['alt+s'], (event: KeyboardEvent): boolean => {
      this.postCluster()
      return false;
    }));
  }

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
        this.toastr.success($localize`New Server created`)
        this.route.navigate(['clusters'])
      })
  }



}
