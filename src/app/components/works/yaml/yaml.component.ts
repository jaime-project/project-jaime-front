import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from 'src/app/models/models';
import { WorkService } from 'src/app/services/works/work.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-yaml-work',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlWorkComponent implements OnInit {

  contentYaml: string = ""

  constructor(private workService: WorkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.workService.getWork(id).subscribe(data => {

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }


}
