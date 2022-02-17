import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListModuleComponent implements OnInit {

  modulesName: string[] = []
  repo: string = ""

  constructor(private modulesService: ModuleService, private activatedRoute: ActivatedRoute, private route: Router, private docsService: DocsService) { }

  ngOnInit(): void {

    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.modulesService.listModules(this.repo!)
      .subscribe(data => {
        this.modulesName = data.sort()
      })
  }

  deleteModule(name: string) {

    Swal.fire({
      title: 'Delete agent',
      text: 'Delete agent with name "' + name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.docsService.deleteDocs(name, this.repo)
        this.modulesService.deleteModule(name, this.repo)
          .subscribe(() => {
            this.route.navigate([`repos/${this.repo}/modules`])
          })
      }
    })
  }

}
