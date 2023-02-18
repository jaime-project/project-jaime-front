import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { MessageShort } from 'src/app/models/models';
import { MessageService } from 'src/app/services/messages/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-message',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListMessageComponent implements OnInit {

  pageLoading: boolean = true
  thread: Subscription | null = null
  messageShort: MessageShort[] = []
  messageStatus: string[] = []

  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  orderBy: string = 'id'
  reverse: boolean = false
  filterBy: string = ''
  page: number = 1
  size: number = 10

  changeOrder(order: string) {
    this.reverse = !this.reverse
    this.orderBy = order.toLowerCase()
  }

  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });

    this.messageService.listMessageStatus()
      .subscribe(data => {
        this.messageStatus = data.sort();
      })
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.messageService.listMessages(this.size, this.page, this.filterBy, this.orderBy)
      .subscribe(data => {
        this.messageShort = data;
        if (this.reverse) {
          this.messageShort = data.reverse()
        }
        this.pageLoading = false
      })
  }

  deleteMessage(id: string) {
    Swal.fire({
      title: $localize`Delete message`,
      text: $localize`Delete message with id ${id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.messageService.deleteMessage(id)
          .subscribe(() => {
            this.toastr.success($localize`message deleted`)
          })
      }
    })
  }

  deleteByStatus(status: string) {
    Swal.fire({
      title: $localize`Delete messages`,
      text: $localize`Delete messages with status ${status}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.messageService.deleteMessagesByStatus(status)
          .subscribe(() => {
            this.toastr.success($localize`Messages deleted`)
          })
      }
    })
  }
}
