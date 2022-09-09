import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
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
  filterBy: string = ''

  constructor(private modulesService: ModuleService, private activatedRoute: ActivatedRoute, private route: Router, private docsService: DocsService, private toastr: ToastrService) { }

  thread: Subscription | null = null

  ngOnInit(): void {

    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!

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
    this.modulesService.listModules(this.repo!)
      .subscribe(data => {
        this.modulesName = this.filterFunction(data.sort())
      })
  }

  deleteModule(name: string) {

    Swal.fire({
      title: $localize`Delete agent`,
      text: $localize`Delete agent with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.docsService.deleteDocs(name, this.repo)
        this.modulesService.deleteModule(name, this.repo)
          .subscribe(() => {
            this.toastr.success($localize`Agent deleted`)
            this.route.navigate([`repos/${this.repo}/modules`])
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
