import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docs-module',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DetailDocsComponent implements OnInit {

  public docsEditSwitchActivated = false

  moduleName: string | null = ""
  moduleDocs: string | null = ""

  constructor(private docsService: DocsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moduleName = this.route.snapshot.paramMap.get('name')

    this.docsService.getDocs(this.moduleName)
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
        this.docsService.putDocs(this.moduleName, modifyDocs)
          .subscribe(() => {
            Swal.fire({
              title: 'Module doc updated',
              icon: 'success',
            }).then(() =>
              window.location.reload()
            )
          })
      }
    })

  }

}
