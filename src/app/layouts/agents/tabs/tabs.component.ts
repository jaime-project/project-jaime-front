import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-agent',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsAgentComponent implements OnInit {

  selectedTabId = 1

  constructor() { }

  ngOnInit(): void {
  }

}
