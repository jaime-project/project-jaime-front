import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-var-config',
  templateUrl: './var.component.html',
  styleUrls: ['./var.component.css']
})
export class VarConfigComponent implements OnInit {

  editSwitchActivated = false

  configs: any = {}
  itemsConfigs: any[] = []

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.getConfigsAll()
      .subscribe(data => {
        this.configs = data

        for (let key of Object.keys(this.configs)) {
          this.itemsConfigs.push({
            "key": key,
            "value": this.configs[key]
          })
        }
      })
  }

}
