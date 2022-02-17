import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AgentShort } from 'src/app/models/models';
import { AgentService } from 'src/app/services/agents/agents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListAgentComponent implements OnInit {

  thread: Subscription | null = null

  agents: AgentShort[] = []

  constructor(private agentService: AgentService) { }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.agentService.getAgentsAll()
      .subscribe(data => {
        this.agents = data
      })
  }

  deleteAgent(id: string) {

    Swal.fire({
      title: 'Delete agent',
      text: 'Delete agent with name "' + id + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.agentService.deleteAgent(id)
          .subscribe(() => {
            window.location.reload()
          })
      }
    })
  }

}
