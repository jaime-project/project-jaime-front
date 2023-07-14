import { Component, Input, OnInit } from '@angular/core';

// TODO: hacer que funcione porque se pierde el valor del content del hijo al padre
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
