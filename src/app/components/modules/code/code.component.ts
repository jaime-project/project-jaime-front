import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-module',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeModuleComponent implements OnInit {

  public codeEditSwitchActivated = false

  constructor() { }

  ngOnInit(): void {
  }

}
