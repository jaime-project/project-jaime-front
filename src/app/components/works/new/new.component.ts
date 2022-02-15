import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import { WorkService } from 'src/app/services/works/work.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-new-work',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewWorkComponent implements OnInit {

  modules: string[] = []
  moduleDocs: string = "asd"
  agentsTypes: string[] = []

  workForm = new FormGroup({
    name: new FormControl(''),
    module: new FormControl(''),
    agentType: new FormControl(''),
    yaml: new FormControl(),
  });

  constructor(private route: Router, private workService: WorkService, private moduleService: ModuleService, private clusterService: ClustersService, private docsService: DocsService) { }

  ngOnInit(): void {

    this.moduleService.listModules()
      .subscribe(data => {
        this.modules = data.sort()
      })

    this.clusterService.listServerTypes()
      .subscribe(data => {
        this.agentsTypes = data
      })
  }

  moduleChange(moduleName: any) {
    this.docsService.getDocsWithoutError(moduleName)
      .subscribe(data => {
        this.workForm = new FormGroup({
          name: new FormControl(this.workForm.value.name),
          module: new FormControl(this.workForm.value.module),
          agentType: new FormControl(this.workForm.value.agentType),
          yaml: new FormControl(data),
        })
      })
  }

  postWork() {

    let yamlJson = this.workForm.value.yaml != null ? parse(this.workForm.value.yaml) : {}

    let finalJson = {
      name: this.workForm.value.name,
      agent: {
        type: this.workForm.value.agentType
      },
      module: this.workForm.value.module,
      ...yamlJson
    }

    let doc = new Document()
    doc.contents = finalJson
    let finalYaml = doc.toString()

    this.workService.postWork(finalYaml)
      .subscribe(result => {
        Swal.fire({
          title: 'Success creation',
          text: 'Generated id: "' + result.id + '"',
          icon: 'success',
          confirmButtonColor: '#05b281',
        }).then(() =>
          this.route.navigate(['works'])
        )
      })
  }

}
