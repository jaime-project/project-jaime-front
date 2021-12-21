import { Component, OnInit } from '@angular/core';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-docs',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewDocsComponent implements OnInit {

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
