import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { ReposService } from 'src/app/services/modules/repos.service';
import { WorkService } from 'src/app/services/works/work.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-new-work',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewWorkComponent implements OnInit {

  repo: string = ""
  repos: string[] = []
  modules: string[] = []
  moduleDocs: string = ""
  agentsTypes: string[] = []

  workForm = new FormGroup({
    name: new FormControl(''),
    repo: new FormControl(''),
    module: new FormControl(''),
    agentType: new FormControl(''),
    yaml: new FormControl(),
  });

  constructor(private route: Router, private workService: WorkService, private moduleService: ModuleService, private reposService: ReposService, private clusterService: ClustersService, private docsService: DocsService) { }

  ngOnInit(): void {

    this.reposService.listRepos()
      .subscribe(data => {
        this.repos = data.sort()
      })

    this.clusterService.listServerTypes()
      .subscribe(data => {
        this.agentsTypes = data
      })
  }

  repoChange(repoName: any) {
    this.repo = repoName
    this.moduleService.listModules(repoName)
      .subscribe(data => {
        this.modules = data.sort()
      })
  }

  moduleChange(moduleName: any) {
    this.docsService.getDocsWithoutError(moduleName, this.repo)
      .subscribe(data => {
        this.workForm = new FormGroup({
          name: new FormControl(this.workForm.value.name),
          module: new FormControl(this.workForm.value.module),
          agentType: new FormControl(this.workForm.value.agentType),
          yaml: new FormControl(data),
        })
      })
  }

  postWork() {

    let yamlJson = this.workForm.value.yaml != null ? parse(this.workForm.value.yaml) : {}

    let finalJson = {
      name: this.workForm.value.name,
      agent: {
        type: this.workForm.value.agentType
      },
      module: this.workForm.value.module,
      ...yamlJson
    }

    let doc = new Document()
    doc.contents = finalJson
    let finalYaml = doc.toString()

    this.workService.postWork(finalYaml)
      .subscribe(result => {
        Swal.fire({
          title: 'Success creation',
          text: 'Generated id: "' + result.id + '"',
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() =>
          this.route.navigate(['works'])
        )
      })
  }

}
