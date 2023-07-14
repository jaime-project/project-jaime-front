import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReposService } from 'src/app/services/modules/repos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-cluster',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewRepoComponent implements OnInit {

  repoTypes: string[] = []
  selectedRepoType: string = ""
  butonClicked: boolean = false

  repoLocalForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
  });

  repoGitForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    url: new UntypedFormControl(''),
    branch: new UntypedFormControl(''),
    path: new UntypedFormControl(''),
    user: new UntypedFormControl(''),
    pass: new UntypedFormControl(''),
  });

  constructor(private route: Router, private reposService: ReposService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.reposService.listReposTypes()
      .subscribe(data => {
        this.repoTypes = data.sort()
      })
  }

  repoTypeChange(repoType: string) {
    this.selectedRepoType = repoType
  }

  postRepo() {

    var repo = {}

    if (this.selectedRepoType == 'LOCAL') {
      repo = {
        type: 'LOCAL',
        ...this.repoLocalForm.value
      }
    }

    if (this.selectedRepoType == 'GIT') {
      repo = {
        type: 'GIT',
        ...this.repoGitForm.value
      }
    }

    this.butonClicked = true

    this.reposService.postRepos(repo)
      .subscribe(() => {
        this.toastr.success($localize`New repo created`)
        this.butonClicked = false
        this.route.navigate(['repos'])
      })
  }

}
