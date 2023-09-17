import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { CardShort } from 'src/app/models/models';
import { CardService } from 'src/app/services/cards/card.service';
import { DocsService } from 'src/app/services/modules/docs.service';
import Swal from 'sweetalert2';

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
  cardParams: string = ''
  currentCard: CardShort = {
    id: '',
    title: '',
    body: '',
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

    this.docsService.getDocs(this.currentCard.module, this.currentCard.repo)
      .subscribe(data => {
        this.cardParams = data
      })
  }

  runCard() {
    console.info(this.currentCard.id)
    console.info(this.cardParams)
  }

}
