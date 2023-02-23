import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocsService } from 'src/app/services/modules/docs.service';
import { MarkdownsService } from 'src/app/services/modules/markdowns.service';
import { ModuleService } from 'src/app/services/modules/modules.service';

@Component({
  selector: 'app-newmarkdown-module',
  templateUrl: './newmarkdown.component.html',
  styleUrls: ['./newmarkdown.component.css']
})
export class NewMarkdownComponent implements OnInit {

  repo: string = ""
  name: string = ""
  code: string = ""

  constructor(
    private route: Router,
    private markdownService: MarkdownsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
  }

  postMarkdown() {

    this.markdownService.postMarkdowns(this.name, this.code, this.repo)
      .subscribe(() => {
        this.route.navigate([`repos/${this.repo}/modules`])
        this.toastr.success($localize`New module ${this.name} created`)
      })
  }

}
