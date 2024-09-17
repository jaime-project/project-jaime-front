import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/servers/servers.service';

@Component({
  selector: 'app-tabs-server',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsServerComponent implements OnInit {

  selectedTabId = 1
  serverName: string = ""

  constructor(private serverService: ServerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name')

    this.serverService.getServer(name).subscribe(data => {
      this.serverName = data.name
    })
  }

}
