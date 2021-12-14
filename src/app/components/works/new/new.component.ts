import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkService } from 'src/app/services/works/work.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-new-work',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewWorkComponent implements OnInit {

  workForm = new FormGroup({
    name: new FormControl(''),
    moduleName: new FormControl(''),
    agentType: new FormControl(''),
    yaml: new FormControl(''),
  });

  constructor(private workService: WorkService) { }

  ngOnInit(): void {

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
