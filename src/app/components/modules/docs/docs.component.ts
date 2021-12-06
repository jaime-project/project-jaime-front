import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs-module',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsModuleComponent implements OnInit {

  public docsEditSwitchActivated = false


  constructor() { }

  ngOnInit(): void {
  }

}
