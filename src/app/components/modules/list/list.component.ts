import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListModuleComponent implements OnInit {

  modulesName: string[] = []

  constructor(private modulesService: ModuleService) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.modulesService.listModules()
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
        this.modulesService.deleteModule(name)
          .subscribe(() => {
            window.location.reload()
          })
      }
    })
  }

}
