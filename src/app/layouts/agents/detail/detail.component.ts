import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/models/models';
import { AgentService } from 'src/app/services/agents/agents.service';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailAgentComponent implements OnInit {

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
    })
  }

}
