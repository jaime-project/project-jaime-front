import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docs-module',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DetailDocsComponent implements OnInit {

  public docsEditSwitchActivated = false

  repo: string = ""
  moduleName: string = ""
  moduleDocs: string = ""

  constructor(private docsService: DocsService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
    this.moduleName = this.activatedRoute.snapshot.paramMap.get('name')!

    this.docsService.getDocs(this.moduleName, this.repo)
      .subscribe(data => {
        this.moduleDocs = data;
      })
  }

  putDocs(modifyDocs: string) {

    Swal.fire({
      title: 'Update docs',
      text: 'Update docs with name "' + this.moduleName + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.docsService.putDocs(this.moduleName, modifyDocs, this.repo)
          .subscribe(() => {
            this.route.navigate(['docs'])
          })
      }
    })

  }

}
