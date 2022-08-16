import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from 'src/app/models/models';
import { WorkService } from 'src/app/services/works/work.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-work',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailWorkComponent implements OnInit {

  paramsYaml: string = ""

  work: Work = {
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
    // status_date: null,
    terminated_date: null
  }

  constructor(private workService: WorkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.workService.getWork(id).subscribe(data => {
      this.work = data

      let doc = new Document()
      doc.contents = data.params
      this.paramsYaml = doc.toString()
    })
  }

}
