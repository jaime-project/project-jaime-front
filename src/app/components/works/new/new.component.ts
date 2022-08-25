import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agents/agents.service';
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

  repos: string[] = []
  modules: string[] = []
  moduleDocs: string = ""
  agentsTypes: string[] = []

  workForm = new FormGroup({
    name: new FormControl(''),
    moduleRepo: new FormControl(''),
    moduleName: new FormControl(''),
    agentType: new FormControl(''),
    params: new FormControl(),
  });

  constructor(private route: Router, private workService: WorkService, private moduleService: ModuleService, private reposService: ReposService, private agent_service: AgentService, private docsService: DocsService) { }

  ngOnInit(): void {

    this.reposService.listRepos()
      .subscribe(data => {
        this.repos = data.sort()
      })

    this.agent_service.listAgentsTypes()
      .subscribe(data => {
        this.agentsTypes = data
      })
  }

  repoChange(repoName: any) {
    this.moduleService.listModules(repoName)
      .subscribe(data => {
        this.modules = data.sort()
      })
  }

  moduleChange(moduleName: any) {
    this.docsService.getDocsWithoutError(moduleName, this.workForm.value.moduleRepo)
      .subscribe(data => {
        this.workForm = new FormGroup({
          name: new FormControl(this.workForm.value.name),
          moduleRepo: new FormControl(this.workForm.value.moduleRepo),
          moduleName: new FormControl(this.workForm.value.moduleName),
          agentType: new FormControl(this.workForm.value.agentType),
          params: new FormControl(data)
        })
      })
  }

  postWork() {

    let yamlJson = this.workForm.value.params != null ? parse(this.workForm.value.params) : {}

    let finalJson = {
      name: this.workForm.value.name,
      agent_type: this.workForm.value.agentType,
      module_name: this.workForm.value.moduleName,
      module_repo: this.workForm.value.moduleRepo,
      params: yamlJson
    }

    let doc = new Document()
    doc.contents = finalJson
    let finalYaml = doc.toString()

    this.workService.postWork(finalYaml)
      .subscribe(result => {
        Swal.fire({
          title: $localize`Success creation`,
          text: $localize`Generated id ${result.id}`,
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() =>
          this.route.navigate(['works'])
        )
      })
  }

}
