import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-tabs-job',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsMessageComponent implements OnInit {

  messageTittle: string = ""

  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')

    this.messageService.getMessage(name!).subscribe(data => {
      this.messageTittle = data.title
    })
  }
}
