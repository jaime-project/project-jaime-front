import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/services/modules/modules.service';

@Component({
  selector: 'app-newcode-module',
  templateUrl: './newcode.component.html',
  styleUrls: ['./newcode.component.css']
})
export class NewCodeModuleComponent implements OnInit {

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
  }

  postCode(nameCode: string, newCode: string) {
    this.moduleService.postModule(nameCode, newCode)
      .subscribe(() => window.location.reload())
  }

}
