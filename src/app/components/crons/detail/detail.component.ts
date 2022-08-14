import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CronWork } from 'src/app/models/models';
import { CronService } from 'src/app/services/crons/cron.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-cron',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailCronComponent implements OnInit {

  paramsYaml: string = ""

  cron: CronWork = {
    name: "",
    cron_expression: "",
    work_module_repo: "",
    work_module_name: "",
    work_agent_type: "",
    id: "",
    creation_date: new Date(),
    status: "",
    work_params: {}
  }

  constructor(private cronService: CronService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.cronService.getCron(id).subscribe(data => {
      this.cron = data

      let doc = new Document()
      doc.contents = data.work_params
      this.paramsYaml = doc.toString()
    })
  }

}
