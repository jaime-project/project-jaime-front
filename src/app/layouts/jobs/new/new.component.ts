import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/services/agents/agents.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { ReposService } from 'src/app/services/modules/repos.service';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-new-job',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewJobComponent implements OnInit {

  repos: string[] = []
  modules: string[] = []
  docs: string[] = []
  agentsTypes: string[] = []
  docParams: string = ''
  loading: boolean = false

  jobForm = new FormGroup({
    name: new FormControl(''),
    repoName: new FormControl(''),
    moduleName: new FormControl(''),
    docName: new FormControl(''),
    agentType: new FormControl(''),
    params: new FormControl(),
  });

  constructor(private route: Router, private jobService: JobService, private moduleService: ModuleService, private reposService: ReposService, private agent_service: AgentService, private docsService: DocsService, private toastr: ToastrService, private hotkeysService: HotkeysService) {
    this.hotkeysService.add(new Hotkey(['alt+s'], (event: KeyboardEvent): boolean => {
      this.postJob()
      return false;
    }));
  }

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

    this.docsService.listDocs(repoName)
      .subscribe(data => {
        this.docs = data.sort()
      })
  }

  docChange(docName: any) {
    this.docsService.getDocsWithoutError(docName, this.jobForm.value.repoName)
      .subscribe(data => {
        this.docParams = data
      })
  }

  postJob() {

    this.loading = true

    let yamlJson = {}
    try {
      yamlJson = this.jobForm.value.params != null ? parse(this.jobForm.value.params) : {}

    } catch (error: any) {
      this.toastr.error(error, 'Invalid yaml')
      this.loading = false
      throw error
    }

    let finalJson = {
      name: this.jobForm.value.name,
      agent_type: this.jobForm.value.agentType,
      module_name: this.jobForm.value.moduleName,
      module_repo: this.jobForm.value.repoName,
      params: yamlJson
    }

    let doc = new Document()
    doc.contents = finalJson
    let finalYaml = doc.toString()

    console.log(finalYaml)

    this.jobService.postJob(finalYaml)
      .subscribe(
        result => {
          this.toastr.success($localize`Generated id ${result.id}`, $localize`Success creation`)
          this.route.navigate(['jobs'])
        },
        error => {
          this.toastr.error($localize`Error on create new Job`)
          this.loading = false
        })
  }

}
