import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-cluster',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsClusterComponent implements OnInit {

  selectedTabId = 1

  constructor() { }

  ngOnInit(): void {
  }

}
