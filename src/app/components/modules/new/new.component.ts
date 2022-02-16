import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import Swal from 'sweetalert2';
import { Document } from 'yaml';

@Component({
  selector: 'app-new-module',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewModuleComponent implements OnInit {

  repo: string = ""
  name: string = ""
  title: string = ""
  description: string = ""
  yaml: string = ""
  code: string = ""

  constructor(private route: Router, private moduleService: ModuleService, private docsService: DocsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.repo = this.activatedRoute.snapshot.paramMap.get('repo')!
  }

  postModule() {

    let yaml_dict = {
      title: this.title,
      description: this.description,
      yaml: this.yaml
    }

    let doc = new Document()
    doc.contents = yaml_dict
    let finalYaml = doc.toString()

    this.docsService.postDocs(this.name, finalYaml, this.repo)

    this.moduleService.postModule(this.name, finalYaml, this.repo)
      .subscribe(() => {
        Swal.fire({
          title: 'Success creation',
          text: 'Generated module: "' + this.name + '"',
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() =>
          this.route.navigate(['modules'])
        )
      })
  }

}
