import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newcode-module',
  templateUrl: './newcode.component.html',
  styleUrls: ['./newcode.component.css']
})
export class NewCodeModuleComponent implements OnInit {

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
  }

  postCode(nameCode: string, newCode: string) {
    this.moduleService.postModule(nameCode, newCode)
      .subscribe(() => {
        Swal.fire({
          title: 'Success creation',
          text: 'Generated code: "' + nameCode + '"',
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() =>
          window.location.reload()
        )
      })
  }

}
