import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CronJob } from 'src/app/models/models';
import { CronService } from 'src/app/services/crons/cron.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-cron',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailCronComponent implements OnInit {

  paramsYaml: string = ""

  cron: CronJob = {
    name: "",
    cron_expression: "",
    job_module_repo: "",
    job_module_name: "",
    job_agent_type: "",
    id: "",
    creation_date: new Date(),
    status: "",
    job_params: {}
  }

  constructor(private cronService: CronService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.cronService.getCron(id).subscribe(data => {
      this.cron = data

      let doc = new Document()
      doc.contents = data.job_params
      this.paramsYaml = doc.toString()
    })
  }

}
