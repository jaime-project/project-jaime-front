import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/cards/card.service';
import { CronService } from 'src/app/services/crons/cron.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-card',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlCardComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""
  contentDefaultDoc: string = ""

  id: string = ""

  constructor(private cardService: CardService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!

    this.cardService.getCard(this.id).subscribe(data => {
      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })

    this.cardService.getDefaultDoc(this.id).subscribe(data => {
      this.contentDefaultDoc = data
    })
  }


  putCron(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update Card`,
      text: $localize`Update card with id ${this.id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cardService.putCard(this.id, parse(modifyYaml))
          .subscribe(() => {
            this.toastr.success($localize`Card updated`)
            this.route.navigate(['cards'])
          })
      }
    })

  }

  putDefaultDoc(modifyDefaultDoc: string) {

    Swal.fire({
      title: $localize`Update card docs`,
      text: $localize`Update card docs with id ${this.id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cardService.putDefaultDoc(this.id, parse(modifyDefaultDoc))
          .subscribe(() => {
            this.toastr.success($localize`Card default docs updated`)
            this.route.navigate(['cards'])
          })
      }
    })
  }


}
