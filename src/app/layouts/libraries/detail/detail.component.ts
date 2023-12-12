import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card, Library } from 'src/app/models/models';
import { CardService } from 'src/app/services/cards/card.service';
import { LibraryService } from 'src/app/services/libraries/library.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-library',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailLibraryComponent implements OnInit {

  library: Library = {
    name: "",
    description: "",
    repo: "",
    branch: "",
    path: "",
    user: "",
    password: ""
  }

  constructor(private libraryService: LibraryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')!

    this.libraryService.getLibrary(name).subscribe(data => {
      this.library = data
    })
  }

}
