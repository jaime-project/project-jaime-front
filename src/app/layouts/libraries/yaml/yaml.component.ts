import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibraryService } from 'src/app/services/libraries/library.service';
import Swal from 'sweetalert2';
import { Document, parse } from 'yaml';

@Component({
  selector: 'app-yaml-library',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlLibraryComponent implements OnInit {

  public editSwitchActivated = false

  contentYaml: string = ""

  name: string = ""

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name')!

    this.libraryService.getLibrary(this.name).subscribe(data => {
      this.contentYaml = data

      let doc = new Document()
      doc.contents = data as any
      this.contentYaml = doc.toString()
    })
  }


  putLibrary(modifyYaml: string) {

    Swal.fire({
      title: $localize`Update Library`,
      text: $localize`Update library with name ${this.name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.libraryService.putLibrary(parse(modifyYaml))
          .subscribe(() => {
            this.toastr.success($localize`Library updated`)
            this.route.navigate(['cards'])
          })
      }
    })

  }

}
