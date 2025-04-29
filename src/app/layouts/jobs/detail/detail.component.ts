import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/models';
import { JobService } from 'src/app/services/jobs/job.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailJobComponent implements OnInit {

  paramsYaml: string = ""

  job: Job = {
    agent: {
      host: "",
      id: "",
      port: "",
      type: "",
      status: ""
    },
    id: "",
    module_name: "",
    module_repo: "",
    name: "",
    params: {},
    running_date: null,
    start_date: null,
    status: "",
    terminated_date: null
  }

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.jobService.getJob(id).subscribe(data => {
      this.job = data

      if (data.params) {
        let doc = new Document()
        doc.contents = data.params
        this.paramsYaml = doc.toString()
      }

    })
  }

}
