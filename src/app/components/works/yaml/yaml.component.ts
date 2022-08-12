import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkService } from 'src/app/services/works/work.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-work',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlWorkComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""

  work_id: string = ""

  constructor(private workService: WorkService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.work_id = this.activatedRoute.snapshot.paramMap.get('id')!

    this.workService.getWork(this.work_id).subscribe(data => {

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }


  putWork(modifyYaml: string) {

    Swal.fire({
      title: 'Update Job',
      text: 'Update job with id "' + this.work_id + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.workService.putWork(parse(modifyYaml))
          .subscribe(() =>
            this.route.navigate(['works'])
          )
      }
    })

  }


}
