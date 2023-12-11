import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { LibraryShort } from 'src/app/models/models';
import { LibraryService } from 'src/app/services/configs/library.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-library',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListLibraryComponent implements OnInit {

  pageLoading: boolean = true
  subscription: Subscription | null = null
  librariesShort: LibraryShort[] = []

  orderBy: string = 'name'
  reverse: boolean = false
  filterBy: string = ''
  page: number = 1
  size: number = 10

  constructor(private libraryService: LibraryService, private toastr: ToastrService, private route: Router) { }

  changeOrder(order: string) {
    this.reverse = !this.reverse
    this.orderBy = order.toLowerCase()
  }

  ngOnInit(): void {

    this.loadStartData()

    this.subscription = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  loadStartData() {
    this.libraryService.getLibrariesAllShort(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {

        this.librariesShort = data;
        if (this.reverse) {
          this.librariesShort = data.reverse()
        }
        this.pageLoading = false
      })
  }

  deleteLibrary(name: string) {
    Swal.fire({
      title: `Delete library`,
      text: $localize`Delete library with name ${name}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.libraryService.deleteLibrary(name)
          .subscribe(() => {
            this.toastr.success($localize`Delete library success`)
            this.route.navigate(['libraries'])
          })
      }
    })
  }


  exportLibrary(clusterName: string) {
    this.libraryService.exportLibrary(clusterName)
      .subscribe(data => {
        FileSaver.saveAs(data, `${new Date().toISOString()}.yaml`);
      })
  }


}
