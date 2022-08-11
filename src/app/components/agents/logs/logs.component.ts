import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-logs-agent',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsAgentComponent implements OnInit {

  logsContent: string = ""
  thread: Subscription | null = null
  id: string | null = ""

  constructor(private configService: ConfigService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.configService.getAgentLogs(this.id!)
      .subscribe(data => {
        console.log(data)
        this.logsContent = data;
      })
  }
}
