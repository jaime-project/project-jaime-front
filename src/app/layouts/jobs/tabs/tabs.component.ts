import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-job',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsJobComponent implements OnInit {

  selectedTabId = 1

  constructor() { }

  ngOnInit(): void {
  }

}
