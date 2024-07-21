import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ReposService } from 'src/app/services/modules/repos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListModuleComponent implements OnInit {

  reposLocal: string[] = []
  reposGit: string[] = []
  filterBy: string = ''
  pageLoading: boolean = false

  reposLocalFiltered: string[] = []
  reposGitFiltered: string[] = []

  coomitRepoName: string = ""
  commitButonClicked: boolean = false
  commitForm = new UntypedFormGroup({
    comment: new UntypedFormControl(''),
  });

  constructor(private reposService: ReposService, private route: Router, private toastr: ToastrService) { }

  thread: Subscription | null = null

  ngOnInit(): void {
    this.loadStartData()
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.reposService.listReposByType('LOCAL')
      .subscribe(data => {
        this.reposLocal = data
        this.reposLocalFiltered = data
      })
    this.reposService.listReposByType('GIT')
      .subscribe(data => {
        this.reposGit = data
        this.reposGitFiltered = data
      })
  }

  deleteRepo(name: string) {

    Swal.fire({
      title: $localize`Delete repository`,
      text: $localize`Delete repository with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.reposService.deleteRepos(name)
          .subscribe(() => {
            this.toastr.success($localize`Repository deleted`)
            this.loadStartData()
          })
      }
    })
  }

  reloadRepo(name: string) {

    Swal.fire({
      title: $localize`Reload repository`,
      text: $localize`Reload repository with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {

        this.pageLoading = true

        this.reposService.reloadRepos(name)
          .subscribe(() => {
            this.pageLoading = false
            this.toastr.success($localize`Repository ${name} reloaded`)
          })
      }
    })
  }

  filterFunction() {

    this.reposGitFiltered = this.reposGit
      .filter(r => {
        return r.toLowerCase().includes(this.filterBy.toLowerCase())
      })

    this.reposLocalFiltered = this.reposLocal
      .filter(r => {
        return r.toLowerCase().includes(this.filterBy.toLowerCase())
      })
  }

  exportRepo(repoName: string) {

    this.toastr.info($localize`Exporting ${repoName} to yaml`, $localize`Exporting reposotiry`)

    this.reposService.exportRepo(repoName)
      .subscribe(data => {
        FileSaver.saveAs(data, `${new Date().toISOString()}.yaml`);
        this.toastr.success($localize`Export yaml successfull`)
      })
  }

  exportRepoZip(repoName: string) {

    this.toastr.info($localize`Exporting ${repoName} to Zip`, $localize`Exporting reposotiry`)

    this.reposService.exportRepoZip(repoName)
      .subscribe(data => {
        FileSaver.saveAs(data, `${new Date().toISOString()}.tar.gz`);
        this.toastr.success($localize`Export Zip successfull`)
      })
  }

  updateCommitRepoName(repoName: string) {
    this.coomitRepoName = repoName
  }

  commitChanges() {

    document.getElementById("modalCommitCloseButton")!.click()
    this.pageLoading = true

    this.reposService.commitAndPush(this.coomitRepoName, this.commitForm.value.comment)
      .subscribe(
        _ => {
          this.toastr.success($localize`Commited and pushed changes to repository ${this.coomitRepoName}`, $localize`Success commit`)
          this.pageLoading = false
        },
        _ => {
          this.toastr.error($localize`Error on create new Job`)
          this.pageLoading = false
        })
  }

}
