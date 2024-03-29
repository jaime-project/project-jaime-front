import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { MarkdownsService } from 'src/app/services/modules/markdowns.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListModuleComponent implements OnInit {

  modulesName: string[] = []
  docsName: string[] = []
  markdownsName: string[] = []
  repo: string = ""
  filterBy: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
    private modulesService: ModuleService,
    private docsService: DocsService,
    private markdownsService: MarkdownsService,
  ) { }

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
    this.docsService.listDocs(this.repo!)
      .subscribe(data => {
        this.docsName = this.filterFunction(data.sort())
      })
    this.markdownsService.listMarkdowns(this.repo!)
      .subscribe(data => {
        this.markdownsName = this.filterFunction(data.sort())
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


  deleteModule(name: string) {

    Swal.fire({
      title: $localize`Delete module`,
      text: $localize`Delete module with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.modulesService.deleteModule(name, this.repo)
          .subscribe(() => {
            this.toastr.success($localize`Module ${name} deleted`)
            this.route.navigate([`repos/${this.repo}/modules`])
          })
      }
    })
  }

  deleteDoc(name: string) {

    Swal.fire({
      title: $localize`Delete doc`,
      text: $localize`Delete doc with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.docsService.deleteDocs(name, this.repo)
          .subscribe(() => {
            this.toastr.success($localize`Doc ${name} deleted`)
          })
      }
    })
  }

  deleteMarkdown(name: string) {

    Swal.fire({
      title: $localize`Delete markdown`,
      text: $localize`Delete markdown with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.markdownsService.deleteMarkdowns(name, this.repo)
          .subscribe(() => {
            this.toastr.success($localize`Module ${name} deleted`)
          })
      }
    })
  }

}
