import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleService } from 'src/app/services/modules/modules.service';

@Component({
  selector: 'app-newmodule-module',
  templateUrl: './newmodule.component.html',
  styleUrls: ['./newmodule.component.css']
})
export class NewModuleComponent implements OnInit {

  repo: string = ""
  name: string = ""
  yaml: string = ""
  code: string = ""

  constructor(
    private route: Router,
    private moduleService: ModuleService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
  }

  postModule() {

    this.moduleService.postModule(this.name, this.code, this.repo)
      .subscribe(() => {
        this.route.navigate([`repos/${this.repo}/modules`])
        this.toastr.success($localize`New module ${this.name} created`)
      })
  }

}
