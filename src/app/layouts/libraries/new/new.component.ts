import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Library } from 'src/app/models/models';
import { LibraryService } from 'src/app/services/libraries/library.service';

@Component({
  selector: 'app-new-library',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewLibraryComponent implements OnInit {

  loading: boolean = false

  libraryForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    repo: new UntypedFormControl(''),
    path: new UntypedFormControl(''),
    branch: new UntypedFormControl(''),
    user: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  constructor(private route: Router, private libraryService: LibraryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  postLibrary() {

    this.loading = true

    let finalCard = {
      name: this.libraryForm.value.name,
      description: this.libraryForm.value.description,
      repo: this.libraryForm.value.repo,
      path: this.libraryForm.value.path,
      branch: this.libraryForm.value.branch,
      user: this.libraryForm.value.user,
      password: this.libraryForm.value.password,
    } as Library

    this.libraryService.postLibrary(finalCard)
      .subscribe(
        result => {
          this.toastr.success($localize`Generated name ${result}`, $localize`Success library creation`)
          this.route.navigate(['libraries'])
        },
        _ => {
          this.toastr.error($localize`Error on create new Library`)
          this.loading = false
        })
    this.loading = false
  }

}
