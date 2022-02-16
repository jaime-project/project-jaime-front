import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ReposService } from 'src/app/services/modules/repos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListModuleComponent implements OnInit {

  modulesName: string[] = []

  constructor(private reposService: ReposService, private route: Router) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.reposService.listRepos()
      .subscribe(data => {
        this.modulesName = data.sort()
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

}
