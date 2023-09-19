import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-card',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsCardComponent implements OnInit {

  selectedTabId = 1

  constructor() { }

  ngOnInit(): void {
  }

}
