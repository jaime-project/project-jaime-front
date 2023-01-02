import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  pageLoading: boolean = true
  subscription: Subscription | null = null
  agents: AgentShort[] = []

  constructor(private agentService: AgentService, private toastr: ToastrService, private route: Router) { }

  orderBy: string = 'host'
  reverse: boolean = false
  filterBy: string = ''

  orderFunction(): AgentShort[] {

    let list: AgentShort[] = []

    switch (this.orderBy.toLowerCase()) {
      case 'host':
        list = this.agents.sort((a, b) => a.host.localeCompare(b.host))
        break
      case 'port':
        list = this.agents.sort((a, b) => a.port.localeCompare(b.port))
        break
      case 'type':
        list = this.agents.sort((a, b) => a.type.localeCompare(b.type))
        break
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

  filterFunction() {
    if (!this.filterBy) {
      return this.agents
    }

    return this.agents
      .filter(a => {
        return a.host.toLowerCase().includes(this.filterBy.toLowerCase())
          || String(a.port).toLowerCase().includes(this.filterBy.toLowerCase())
          || a.type.toLowerCase().includes(this.filterBy.toLowerCase())
      })
  }

  ngOnInit(): void {

    this.loadStartData()

    this.subscription = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  loadStartData() {
    this.agentService.getAgentsAll()
      .subscribe(data => {
        this.agents = data
        this.agents = this.orderFunction();
        this.agents = this.filterFunction();
        this.pageLoading = false
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
            this.toastr.success($localize`Agent deleted`)
            this.route.navigate(['agents'])
          })
      }
    })
  }

}
