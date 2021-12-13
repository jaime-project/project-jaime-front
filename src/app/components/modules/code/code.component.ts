import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/services/modules/modules.service';

@Component({
  selector: 'app-code-module',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeModuleComponent implements OnInit {

  moduleCode: string = ""
  public codeEditSwitchActivated = false

  constructor(private moduleService: ModuleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')

    this.moduleService.getModule(name)
      .subscribe(data => {
        this.moduleCode = data;
      })
  }

}
