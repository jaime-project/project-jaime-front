import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { ReposService } from 'src/app/services/modules/repos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListModuleComponent implements OnInit {

  reposLocal: string[] = []
  reposGit: string[] = []

  constructor(private reposService: ReposService, private route: Router) { }

  thread: Subscription | null = null

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
    this.reposService.listReposByType('LOCAL')
      .subscribe(data => {
        this.reposLocal = data.sort()
      })
    this.reposService.listReposByType('GIT')
      .subscribe(data => {
        this.reposGit = data.sort()
      })
  }

  deleteRepo(name: string) {

    Swal.fire({
      title: 'Delete repository',
      text: 'Delete repository with name "' + name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.reposService.deleteRepos(name)
          .subscribe(() => {
            this.route.navigate(['repos'])
          })
      }
    })
  }

  reloadRepo(name: string) {

    Swal.fire({
      title: 'Reload repository',
      text: 'Reload repository with name "' + name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.reposService.reloadRepos(name)
          .subscribe(() => {
            this.route.navigate(['repos'])
          })
      }
    })
  }

}
