import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { CardShort } from 'src/app/models/models';
import { CardService } from 'src/app/services/cards/card.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';
import { parse } from 'yaml';


@Component({
  selector: 'app-list-card',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListCardComponent implements OnInit {

  pageLoading: boolean = true
  subscription: Subscription | null = null
  cardsShort: CardShort[] = []

  constructor(private cardService: CardService, private toastr: ToastrService, private docsService: DocsService) { }

  filterBy: string = ''
  cardDocs: string = ''
  currentCard: CardShort = {
    id: '',
    name: '',
    description: '',
    module: '',
    repo: ''
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
    this.cardService.getCardsAllShort(this.filterBy)
      .subscribe(data => {
        this.cardsShort = data;
        this.pageLoading = false
      })
  }

  deleteCard(id: string) {
    Swal.fire({
      title: $localize`Delete card`,
      text: $localize`Delete card with id ${id}`,
      icon: 'warning',
      confirmButtonColor: '#05b281',
      cancelButtonColor: '#ec312d',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.cardService.deleteCard(id)
          .subscribe(() => {
            this.toastr.success($localize`Card deleted`)
          })
      }
    })
  }

  currentCardToRun(id: string) {

    this.currentCard = this.cardsShort.find(c => c.id == id)!;

    this.cardService.getCardDefaultDoc(id)
      .subscribe(data => {
        this.cardDocs = data
      })
  }

  runCard() {

    this.pageLoading = true

    try {
      if (this.cardDocs != null) {
        parse(this.cardDocs)
      }

    } catch (error: any) {
      this.toastr.error(error, 'Invalid yaml')
      this.pageLoading = false
      throw error
    }

    this.cardService.runCard(this.currentCard.id, this.cardDocs)
      .subscribe(
        result => {
          document.getElementById("modalRunCloseButton")!.click();
          this.toastr.success($localize`Generated id ${result.id}`, $localize`Success job creation`)
        },
        error => {
          this.toastr.error($localize`Error on create new Job`)
          this.pageLoading = false
        })

  }

}
