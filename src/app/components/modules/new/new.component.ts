import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-module',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewModuleComponent implements OnInit {

  repo: string = ""
  name: string = ""
  yaml: string = ""
  code: string = ""

  constructor(private route: Router, private moduleService: ModuleService, private docsService: DocsService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
  }

  postModule() {

    this.docsService.postDocs(this.name, this.yaml, this.repo)
      .subscribe()

    this.moduleService.postModule(this.name, this.code, this.repo)
      .subscribe(() => {
        Swal.fire({
          title: $localize`Success creation`,
          text: $localize`Generated module ${this.name}`,
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() => {
          this.toastr.success($localize`Module created`)
          this.route.navigate([`repos/${this.repo}/modules`])
        })
      })
  }

}
