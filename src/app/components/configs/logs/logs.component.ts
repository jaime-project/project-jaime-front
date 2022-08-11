import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-logs-config',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logsContent: string = ""

  thread: Subscription | null = null

  constructor(private configService: ConfigService, private route: Router) { }

  ngOnInit(): void {
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
    this.configService.getJaimeLogs()
      .subscribe(data => {
        console.log(data)
        this.logsContent = data;
      })
  }
}
