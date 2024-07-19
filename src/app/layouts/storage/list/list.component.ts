import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FileList } from 'src/app/models/models';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-storage',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListStorageComponent implements OnInit {

  fileList: FileList = { dirs: [], files: [] } as FileList
  currentPath: string = "/"
  pageLoading: boolean = true
  filterBy: string = ''
  makeDirButonClicked: boolean = false

  makeDirForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
  });

  constructor(private storageService: StorageService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadStartData()
  }

  isDir(path: string) {
    return this.fileList.dirs.includes(path)
  }

  loadStartData() {
    this.storageService.getFileList(this.currentPath, this.filterBy)
      .subscribe(data => {
        this.fileList = data;
        this.pageLoading = false
      })
  }

  changeCurrentPath(path: string) {

    if (this.isDir(path)) {
      this.currentPath += `/${path}`
    }

    this.loadStartData()
  }

  backCurrentPath() {

    let paths = this.currentPath.split("/")
    this.currentPath = this.currentPath.replace(`/${paths[paths.length - 1]}`, "")

    this.loadStartData()
  }

  goToHomePath() {

    this.currentPath = ""

    this.loadStartData()
  }

  reloadCurrentPath() {
    this.loadStartData()
  }

  deleteFileOrDir(fileOrDirName: string) {

    this.pageLoading = true

    let object = this.isDir(fileOrDirName) ? "directory" : "file"

    Swal
      .fire({
        title: $localize`Delete ${object}`,
        text: $localize`Delete ${object} with name ${fileOrDirName}`,
        icon: 'warning',
        confirmButtonColor: '#05b281',
        cancelButtonColor: '#ec312d',
        showCancelButton: true
      })
      .then(result => {
        if (result.isConfirmed) {
          this.storageService.delete(fileOrDirName, this.currentPath)
            .subscribe(() => {
              this.loadStartData()
              this.pageLoading = false
            })
        }
      })
  }

  makeDir() {
    this.storageService.makeDir(this.makeDirForm.value.name, this.currentPath)
      .subscribe(() => {
        document.getElementById("modalMakeDirCloseButton")!.click()
        this.toastr.success($localize`New directory ${this.makeDirForm.value.name} created`)
        this.makeDirButonClicked = false
        this.loadStartData()
      })
  }

  uploadFile(event: any) {

    this.pageLoading = true

    const file: File = event.target.files[0];

    this.storageService.uploadFile(file, this.currentPath)
      .subscribe(
        () => {
          this.toastr.success($localize`Upload file ${file.name} success`)
          this.pageLoading = false
          this.loadStartData()
        },
        () => {
          this.toastr.error($localize`Error uploading file ${file.name}`)
          this.pageLoading = false
        }
      )
  }

  downloadFile(fileName: string) {
    this.pageLoading = true

    this.storageService.downloadFile(fileName, this.currentPath)
      .subscribe((response) => {
        FileSaver.saveAs(response, fileName);
        this.pageLoading = false
      })
  }

}
