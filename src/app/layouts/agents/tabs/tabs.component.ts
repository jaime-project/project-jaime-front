import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from 'src/app/services/agents/agents.service';

@Component({
  selector: 'app-tabs-agent',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsAgentComponent implements OnInit {

  selectedTabId = 1
  agentHost: string = ""

  constructor(private agentService: AgentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.agentService.getAgent(id).subscribe(data => {
      this.agentHost = data.host
    })
  }

}
