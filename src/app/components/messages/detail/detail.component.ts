import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/models';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailMessageComponent implements OnInit {

  paramsYaml: string = ""

  message: Message = {
    id: "",
    status: "",
    title: "",
    subject: "",
    job: "",
    date: null,
    body: "",
    files: [],
  }

  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.messageService.getMessage(id).subscribe(data => {
      this.message = data
    })
  }

  getFileName(path: string) {
    let paths = path.split('/')
    return paths[paths.length - 1]
  }

}
