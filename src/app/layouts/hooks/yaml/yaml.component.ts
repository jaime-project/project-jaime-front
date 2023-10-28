import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HookService } from 'src/app/services/hooks/hook.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-hook',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlHookComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""

  hookId: string = ""

  constructor(private hookService: HookService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hookId = this.activatedRoute.snapshot.paramMap.get('id')!

    this.hookService.getHook(this.hookId).subscribe(data => {

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }


  putHook(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update Hook`,
      text: $localize`Update hook with id ${this.hookId}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.hookService.putHook(parse(modifyYaml))
          .subscribe(() => {
            this.toastr.success($localize`Hook updated`)
            this.route.navigate(['hooks'])
          })
      }
    })

  }


}
