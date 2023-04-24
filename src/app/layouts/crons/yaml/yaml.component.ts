import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CronService } from 'src/app/services/crons/cron.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-cron',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlCronComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""

  cronId: string = ""

  constructor(private cronService: CronService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cronId = this.activatedRoute.snapshot.paramMap.get('id')!

    this.cronService.getCron(this.cronId).subscribe(data => {

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }


  putCron(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update Cron`,
      text: $localize`Update cron with id ${this.cronId}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cronService.putCron(parse(modifyYaml))
          .subscribe(() => {
            this.toastr.success($localize`New Server created`)
            this.route.navigate(['crons'])
          })
      }
    })

  }


}
