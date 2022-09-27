import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
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
  filterBy: string = ''
  pageLoading: boolean = false

  constructor(private reposService: ReposService, private route: Router, private toastr: ToastrService) { }

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
    this.reposService.listReposByType('LOCAL')
      .subscribe(data => {
        this.reposLocal = this.filterFunction(data.sort())
      })
    this.reposService.listReposByType('GIT')
      .subscribe(data => {
        this.reposGit = this.filterFunction(data.sort())
      })
  }

  deleteRepo(name: string) {

    Swal.fire({
      title: $localize`Delete repository`,
      text: $localize`Delete repository with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.reposService.deleteRepos(name)
          .subscribe(() => {
            this.toastr.success($localize`Repository deleted`)
            this.route.navigate(['repos'])
          })
      }
    })
  }

  reloadRepo(name: string) {

    Swal.fire({
      title: $localize`Reload repository`,
      text: $localize`Reload repository with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {

        this.pageLoading = true

        this.reposService.reloadRepos(name)
          .subscribe(() => {
            this.pageLoading = false
            this.toastr.success($localize`Repository ${name} reloaded`)
          })
      }
    })
  }

  filterFunction(list: string[]) {
    if (!this.filterBy) {
      return list
    }

    return list
      .filter(r => {
        return r.toLowerCase().includes(this.filterBy.toLowerCase())
      })
  }

}
