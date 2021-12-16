import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-module',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeModuleComponent implements OnInit {

  moduleCode: string = ""
  moduleName: string | null = ""
  public codeEditSwitchActivated = false

  constructor(private moduleService: ModuleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moduleName = this.route.snapshot.paramMap.get('name')

    this.moduleService.getModule(this.moduleName)
      .subscribe(data => {
        this.moduleCode = data;
      })
  }

  putModule(modifyCode: string) {

    Swal.fire({
      title: 'Update module',
      text: 'Update module with name "' + this.moduleName + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.moduleService.putModule(this.moduleName, modifyCode)
          .subscribe()
      }
    })

  }

}
