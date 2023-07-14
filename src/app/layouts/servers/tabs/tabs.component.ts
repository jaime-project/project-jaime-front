import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-server',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsServerComponent implements OnInit {

  selectedTabId = 1

  constructor() { }

  ngOnInit(): void {
  }

}
