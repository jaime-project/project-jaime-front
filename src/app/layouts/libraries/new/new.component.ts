import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/models';
import { AgentService } from 'src/app/services/agents/agents.service';
import { CardService } from 'src/app/services/cards/card.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { ReposService } from 'src/app/services/modules/repos.service';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-new-library',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewLibraryComponent implements OnInit {

  repos: string[] = []
  modules: string[] = []
  docs: string[] = []
  agentsTypes: string[] = []
  repo: string = ""
  docParams: string = ""
  cardParams: string = ""
  loading: boolean = false

  cardForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    color: new UntypedFormControl(''),
    job_agent_type: new UntypedFormControl(''),
    job_module_repo: new UntypedFormControl(''),
    job_module_name: new UntypedFormControl(''),
    job_module_doc: new UntypedFormControl(''),
    docParams: new UntypedFormControl(''),
    cardParams: new UntypedFormControl(''),
  });

  constructor(private route: Router, private cardService: CardService, private moduleService: ModuleService, private reposService: ReposService, private agent_service: AgentService, private docsService: DocsService, private toastr: ToastrService) { }

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
    this.docsService.getDocsWithoutError(docName, this.cardForm.value.job_module_repo)
      .subscribe(data => {
        this.docParams = data
      })
  }

  postCard() {

    this.loading = true

    try {
      if (this.docParams) {
        parse(this.docParams)
      }

    } catch (error: any) {
      this.toastr.error(error, 'Invalid default params yaml')
      this.loading = false
      throw error
    }

    try {
      if (this.cardParams) {
        parse(this.cardParams)
      }

    } catch (error: any) {
      this.toastr.error(error, 'Invalid card params yaml')
      this.loading = false
      throw error
    }

    let finalCard = {
      name: this.cardForm.value.name,
      description: this.cardForm.value.description,
      color: this.cardForm.value.color,
      job_agent_type: this.cardForm.value.job_agent_type,
      job_module_repo: this.cardForm.value.job_module_repo,
      job_module_name: this.cardForm.value.job_module_name,
      job_default_docs: parse(this.docParams),
      job_card_docs: this.cardParams
    } as Card

    this.cardService.postCard(finalCard)
      .subscribe(
        resultPostCard => {
          this.toastr.success($localize`Generated id ${resultPostCard.id}`, $localize`Success card creation`)
          this.route.navigate(['cards'])
        },
        _ => {
          this.toastr.error($localize`Error on create new Card`)
          this.loading = false
        })
    this.loading = false
  }

}
