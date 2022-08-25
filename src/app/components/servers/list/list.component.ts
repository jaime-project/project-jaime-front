import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ServerShort } from 'src/app/models/models';
import { ServerService } from 'src/app/services/servers/servers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-server',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListServerComponent implements OnInit {

  listServersShorts: ServerShort[] = []
  testServerLoad: boolean = false

  constructor(private serversService: ServerService, private route: Router) { }

  thread: Subscription | null = null

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
    this.serversService.listServer()
      .subscribe(data => {
        this.listServersShorts = data.sort().reverse();
      })
  }

  testServer(name: string) {

    this.testServerLoad = true
    this.serversService.testServer(name)
      .subscribe(data => {
        this.testServerLoad = false
        if (data.success) {
          Swal.fire({
            title: $localize`Login success`,
            icon: 'success',
            confirmButtonColor: '#05b281',
          })
        }
        else {
          Swal.fire({
            title: 'Login failure',
            text: data.text,
            icon: 'warning',
            confirmButtonColor: '#05b281',
          })
        }
      })
  }

  deleteServer(name: string) {

    Swal.fire({
      title: $localize`Delete server`,
      text: $localize`Delete server with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.serversService.deleteServer(name)
          .subscribe(() => {
            this.route.navigate(['servers'])
          })
      }
    })
  }

}
