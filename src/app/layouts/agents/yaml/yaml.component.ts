import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/models/models';
import { AgentService } from 'src/app/services/agents/agents.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-yaml-agent',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlAgentComponent implements OnInit {

  contentYaml: string = ""
  agent: Agent = {
    host: "",
    id: "",
    port: "",
    type: "",
    status: ""
  }

  constructor(private agentService: AgentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.agentService.getAgent(id).subscribe(data => {
      this.agent = data

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }

}
