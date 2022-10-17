import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-module',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeModuleComponent implements OnInit {

  repo: string = ""
  moduleCode: string = ""
  moduleName: string = ""
  public codeEditSwitchActivated = false

  constructor(private moduleService: ModuleService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
    this.moduleName = this.activatedRoute.snapshot.paramMap.get('name')!

    this.moduleService.getModule(this.moduleName, this.repo)
      .subscribe(data => {
        this.moduleCode = data;
      })
  }

  putModule() {

    Swal.fire({
      title: $localize`Update module`,
      text: $localize`Update module with name ${this.moduleName}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.moduleService.putModule(this.moduleName, this.moduleCode, this.repo)
          .subscribe(() => {
            this.toastr.success($localize`Module updated`)
          })
      }
    })

  }

}
