import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-work',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListWorkComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content3: string) {
    this.modalService.open(content3, { centered: true });
  }

}
