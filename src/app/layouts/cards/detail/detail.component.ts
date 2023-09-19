import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/models/models';
import { CardService } from 'src/app/services/cards/card.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailCardComponent implements OnInit {

  defaultDocs: string = ""

  card: Card = {
    id: "",
    name: "",
    description: "",
    job_module_name: "",
    job_module_repo: "",
    job_agent_type: "",
    job_default_docs: "",
    creation_date: new Date()
  }

  constructor(private cardService: CardService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.cardService.getCard(id).subscribe(data => {
      this.card = data
    })

    this.cardService.getCardDefaultDoc(id).subscribe(data => {
      this.defaultDocs = data
    })
  }

}
