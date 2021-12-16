import { Component, OnInit } from '@angular/core';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newdocs-module',
  templateUrl: './newdocs.component.html',
  styleUrls: ['./newdocs.component.css']
})
export class NewDocsModuleComponent implements OnInit {

  constructor(private docsService: DocsService) { }

  ngOnInit(): void {
  }

  postDocs(nameDocs: string, newDocs: string) {
    this.docsService.postDocs(nameDocs, newDocs)
      .subscribe(() => {
        Swal.fire({
          title: 'Success creation',
          text: 'Generated docs: "' + nameDocs + '"',
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() =>
          window.location.reload()
        )
      })
  }

}
