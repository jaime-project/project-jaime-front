import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-objectsGet-config',
  templateUrl: './objectsGet.component.html',
  styleUrls: ['./objectsGet.component.css']
})
export class ObjectsGetComponent implements OnInit {

  pageLoading: boolean = false

  constructor(private configService: ConfigService, private route: Router) { }

  ngOnInit(): void {
  }

  getObjectsFile() {

    this.pageLoading = true

    this.configService.getYamlFile().subscribe((response) => {
      FileSaver.saveAs(response, `${new Date().toISOString()}.yaml`);
      this.pageLoading = false
    })
  }
}
