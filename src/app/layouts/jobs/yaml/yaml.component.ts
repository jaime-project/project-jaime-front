import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/jobs/job.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-job',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlJobComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""

  job_id: string = ""

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.job_id = this.activatedRoute.snapshot.paramMap.get('id')!

    this.jobService.getJob(this.job_id).subscribe(data => {

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }


  putJob(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update Job`,
      text: $localize`Update job with id ${this.job_id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.jobService.putJob(parse(modifyYaml))
          .subscribe(() => {
            this.toastr.success($localize`Job updated`)
            this.route.navigate(['works'])
          })
      }
    })

  }


}
