import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { AgentShort } from 'src/app/models/models';
import { AgentService } from 'src/app/services/agents/agents.service';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListAgentComponent implements OnInit {

  agents: AgentShort[] = []

  constructor(private modalService: NgbModal, private agentService: AgentService) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.agentService.getAgentsAll()
      .subscribe(data => {
        this.agents = data
      })
  }

  openVerticallyCentered(content3: string) {
    this.modalService.open(content3, { centered: true });
  }
}
