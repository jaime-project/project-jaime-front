import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-docs',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListDocsComponent implements OnInit {

  docsName: string[] = []

  constructor(private docsService: DocsService) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.docsService.listDocs()
      .subscribe(data => {
        this.docsName = data
      })
  }

  deleteDocs(name: string) {

    Swal.fire({
      title: 'Delete agent',
      text: 'Delete agent with name "' + name + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.docsService.deleteDocs(name)
          .subscribe(() => {
            window.location.reload()
          })
      }
    })
  }

}
