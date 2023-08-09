import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
  docs: string[] = []
  docParams: string = ""
  agentsTypes: string[] = []
  loading: boolean = false

  cronForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    cron_expression: new UntypedFormControl(''),
    job_module_repo: new UntypedFormControl(''),
    job_module_name: new UntypedFormControl(''),
    job_agent_type: new UntypedFormControl(''),
    id: new UntypedFormControl(''),
    status: new UntypedFormControl(''),
    job_params: new UntypedFormControl()
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
    this.docsService.listDocs(repoName)
      .subscribe(data => {
        this.docs = data
      })
  }

  docChange(docName: any) {
    this.docsService.getDocsWithoutError(docName, this.cronForm.value.job_module_repo)
      .subscribe(data => {
        this.docParams = data
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
    doc.contents = finalJson as any
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
