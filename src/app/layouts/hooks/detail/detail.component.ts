import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HookJob } from 'src/app/models/models';
import { AppConfigService } from 'src/app/services/AppConfigService';
import { HookService } from 'src/app/services/hooks/hook.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-hook',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailHookComponent implements OnInit {

  paramsYaml: string = ""
  jaimeHookURL: string = ""
  hook: HookJob = {
    name: "",
    job_module_repo: "",
    job_module_name: "",
    job_agent_type: "",
    id: "",
    creation_date: new Date(),
    status: "",
    job_params: {}
  }

  constructor(private hookService: HookService, private route: ActivatedRoute, private appConfigService: AppConfigService) {
    this.jaimeHookURL = appConfigService.config.backendURL + '/api/v1/hooks/exec'
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.hookService.getHook(id).subscribe(data => {
      this.hook = data

      let doc = new Document()
      doc.contents = data.job_params
      this.paramsYaml = doc.toString()
    })
  }

}
