import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  @Input() language: string = "yaml"
  @Input() content: string = ""
  @Input() readOnly: boolean = false

  constructor() { }

  ngOnInit() {
  }
}
