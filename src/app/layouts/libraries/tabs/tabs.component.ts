import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/app/services/libraries/library.service';

@Component({
  selector: 'app-tabs-library',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsLibraryComponent implements OnInit {

  selectedTabId = 1
  libraryName: string = ""

  constructor(private libraryService: LibraryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')

    this.libraryService.getLibrary(name!).subscribe(data => {
      this.libraryName = data.name
    })
  }

}
