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

  orderBy: string = 'host'
  reverse: boolean = false

  orderFunction(): AgentShort[] {

    let list: AgentShort[] = []

    switch (this.orderBy.toLowerCase()) {
      case 'host':
        list = this.agents.sort((a, b) => a.host.localeCompare(b.host))
      case 'port':
        list = this.agents.sort((a, b) => a.port.localeCompare(b.port))
      case 'type':
        list = this.agents.sort((a, b) => a.type.localeCompare(b.type))
    }

    if (this.reverse) {
      list = list.reverse()
    }

    return list
  }

  changeOrder(order: string) {
    this.reverse = !this.reverse
    this.orderBy = order.toLowerCase()
  }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
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
        this.agents = this.orderFunction();
      })
  }

  deleteAgent(id: string) {

    Swal.fire({
      title: $localize`Delete agent`,
      text: $localize`Delete agent with id ${id}`,
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
