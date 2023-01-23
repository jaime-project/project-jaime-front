import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/services/agents/agents.service';
import { CronService } from 'src/app/services/crons/cron.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { ReposService } from 'src/app/services/modules/repos.service';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-new-cron',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewCronComponent implements OnInit {

  repo: string = ""
  repos: string[] = []
  modules: string[] = []
  moduleDocs: string = ""
  agentsTypes: string[] = []
  loading: boolean = false

  cronForm = new FormGroup({
    name: new FormControl(''),
    cron_expression: new FormControl(''),
    job_module_repo: new FormControl(''),
    job_module_name: new FormControl(''),
    job_agent_type: new FormControl(''),
    id: new FormControl(''),
    status: new FormControl(''),
    job_params: new FormControl()
  });

  constructor(private route: Router, private cronService: CronService, private moduleService: ModuleService, private reposService: ReposService, private agent_service: AgentService, private docsService: DocsService, private toastr: ToastrService) { }

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
    this.repo = repoName
    this.moduleService.listModules(repoName)
      .subscribe(data => {
        this.modules = data.sort()
      })
  }

  moduleChange(moduleName: any) {
    this.docsService.getDocsWithoutError(moduleName, this.repo)
      .subscribe(data => {
        this.cronForm = new FormGroup({
          name: new FormControl(this.cronForm.value.name),
          cron_expression: new FormControl(this.cronForm.value.cron_expression),
          job_module_repo: new FormControl(this.cronForm.value.job_module_repo),
          job_module_name: new FormControl(this.cronForm.value.job_module_name),
          job_agent_type: new FormControl(this.cronForm.value.job_agent_type),
          job_params: new FormControl(data),
        })
      })
  }

  postCron() {

    this.loading = true

    let yamlJson = {}
    try {
      yamlJson = this.cronForm.value.job_params != null ? parse(this.cronForm.value.job_params) : {}

    } catch (error: any) {
      this.toastr.error(error, 'Invalid yaml')
      this.loading = false
      throw error
    }

    let finalJson = {
      name: this.cronForm.value.name,
      cron_expression: this.cronForm.value.cron_expression,
      job_module_repo: this.cronForm.value.job_module_repo,
      job_module_name: this.cronForm.value.job_module_name,
      job_agent_type: this.cronForm.value.job_agent_type,
      job_params: yamlJson
    }

    let doc = new Document()
    doc.contents = finalJson
    let finalYaml = doc.toString()

    this.cronService.postCron(finalYaml)
      .subscribe(
        result => {
          this.toastr.success($localize`Generated id ${result.id}`, $localize`Success cron creation`)
          this.route.navigate(['crons'])
        },
        error => {
          this.toastr.error($localize`Error on create new Cron`)
          this.loading = false
        })
  }

}
