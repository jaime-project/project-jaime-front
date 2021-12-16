import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { WorkShort } from 'src/app/models/models';
import { WorkService } from 'src/app/services/works/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-work',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListWorkComponent implements OnInit {

  worksShort: WorkShort[] = []

  constructor(private modalService: NgbModal, private workService: WorkService) { }

  ngOnInit(): void {

    this.loadStartData()

    interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  loadStartData() {
    this.workService.getWorksAllShort()
      .subscribe(data => {
        this.worksShort = data;
      })
  }

  deleteServer(id: string) {

    Swal.fire({
      title: 'Delete work',
      text: 'Delete work with id "' + id + '"',
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.workService.deleteWork(id)
          .subscribe()
      }
    })
  }



  // = {
  //   agent_id: "",
  //   agent_type: "",
  //   id: "",
  //   module_name: "",
  //   name: "",
  //   ready_date: null,
  //   status: ""
  // }


}
