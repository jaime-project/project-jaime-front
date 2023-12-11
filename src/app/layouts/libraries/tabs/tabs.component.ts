import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-library',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsLibraryComponent implements OnInit {

  selectedTabId = 1

  constructor() { }

  ngOnInit(): void {
  }

}
