import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarkdownsService } from 'src/app/services/modules/markdowns.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-markdown-module',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownModuleComponent implements OnInit {

  repo: string = ""
  markdownCode: string = ""
  markdownName: string = ""
  codeEditSwitchActivated: boolean = false

  constructor(private markdownService: MarkdownsService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
    this.markdownName = this.activatedRoute.snapshot.paramMap.get('name')!

    this.markdownService.getMarkdown(this.markdownName, this.repo)
      .subscribe(data => {
        this.markdownCode = data;
      })
  }

  putMarkdown() {

    Swal.fire({
      title: $localize`Update module`,
      text: $localize`Update module with name ${this.markdownName}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.markdownService.putMarkdown(this.markdownName, this.markdownCode, this.repo)
          .subscribe(() => {
            this.toastr.success($localize`Module updated`)
          })
      }
    })

  }

}
