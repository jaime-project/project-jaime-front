import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  currentPath: string = ""

  pageLoading: boolean = true

  filterBy: string = ''

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

  filterFunction() {

    if (!this.filterBy) {
      return this.fileList
    }

    return {
      dirs: this.fileList.dirs.filter(d => {
        return d.toLowerCase().includes(this.filterBy.toLowerCase())
      }),
      files: this.fileList.dirs.filter(f => {
        return f.toLowerCase().includes(this.filterBy.toLowerCase())
      })
    }
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

  reloadCurrentPath() {
    this.loadStartData()
  }

  deleteFileOrDir(fileOrDirName: string) {

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
            .subscribe()
        }
      })
  }


}
