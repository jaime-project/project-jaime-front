import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-module',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewModuleComponent implements OnInit {

  newCode: string = ""

  constructor(private route: Router, private moduleService: ModuleService) { }

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
          this.route.navigate(['modules'])
        )
      })
  }

}
