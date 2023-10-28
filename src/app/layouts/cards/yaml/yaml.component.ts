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
  contentCardDoc: string = ""

  id: string = ""

  constructor(private cardService: CardService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!

    this.cardService.getCard(this.id).subscribe(data => {

      let doc = new Document()
      doc.contents = data
      this.contentYaml = doc.toString()
    })
  }


  putCard(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update Card`,
      text: $localize`Update card with id ${this.id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cardService.putCard(modifyYaml)
          .subscribe(() => {
            this.toastr.success($localize`Card updated`)
            this.route.navigate(['cards'])
          })
      }
    })

  }

}
