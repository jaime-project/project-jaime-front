import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-configs-vars',
  templateUrl: './var.component.html',
  styleUrls: ['./var.component.css']
})
export class VarConfigComponent implements OnInit {

  editSwitchActivated = false

  itemsConfigs: { [key: string]: any } = {}

  constructor(private configService: ConfigService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.configService.getConfigsVars()
      .subscribe(data => {
        this.itemsConfigs = data
      })
  }

  postVars(): void {

    let newDict = { ...this.itemsConfigs }

    for (let item in this.itemsConfigs) {
      newDict[item] = (<HTMLInputElement>document.getElementById(item)).value
    }

    this.configService.postConfigsVars(newDict)
      .subscribe(() => {
        this.toastr.success($localize`New config updated`)
        this.editSwitchActivated = false
        this.route.navigate(['configs'])
      })
  }

}
