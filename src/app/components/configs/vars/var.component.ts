import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-var-config',
  templateUrl: './var.component.html',
  styleUrls: ['./var.component.css']
})
export class VarConfigComponent implements OnInit {

  public configMap = {
    "var": "asd"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
