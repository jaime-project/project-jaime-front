import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/cards/card.service';

@Component({
  selector: 'app-tabs-card',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsCardComponent implements OnInit {

  selectedTabId = 1
  cardName: string = ""

  constructor(private cardService: CardService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.cardService.getCard(id).subscribe(data => {
      this.cardName = data.name
    })
  }

}
