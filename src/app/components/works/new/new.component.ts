import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AgentService } from 'src/app/services/agents/agents.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import { ModuleService } from 'src/app/services/modules/modules.service';
import { ServersService } from 'src/app/services/servers/servers.service';
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
    moduleName: new FormControl(''),
    agentType: new FormControl(''),
    yaml: new FormControl(),
  });

  constructor(private workService: WorkService, private moduleService: ModuleService, private serverService: ServersService, private docsService: DocsService) { }

  ngOnInit(): void {

    this.moduleService.listModules()
      .subscribe(data => {
        this.modules = data
      })

    this.serverService.listServerTypes()
      .subscribe(data => {
        this.agentsTypes = data
      })
  }

  moduleChange(moduleName: any) {
    this.docsService.getDocs(moduleName)
      .subscribe(data => {
        this.workForm = new FormGroup({
          name: new FormControl(this.workForm.value.name),
          moduleName: new FormControl(this.workForm.value.moduleName),
          agentType: new FormControl(this.workForm.value.agentType),
          yaml: new FormControl(data),
        })
      })
  }

  postWork() {

    let yamlJson = parse(this.workForm.value.yaml)

    let finalJson = {
      name: this.workForm.value.name,
      agent: {
        type: this.workForm.value.agentType
      },
      module: this.workForm.value.moduleName,
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
          window.location.reload()
        )
      })
  }

}
