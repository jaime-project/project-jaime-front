import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { WorkService } from 'src/app/services/works/work.service';

@Component({
  selector: 'app-log-work',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogWorkComponent implements OnInit {

  workId: string | null = ""
  workLogs: string | null = ""

  constructor(private workService: WorkService, private route: ActivatedRoute) { }

  thread: Subscription | null = null

  ngOnInit(): void {
    this.workId = this.route.snapshot.paramMap.get('id')

    this.loadStartData()

    this.thread = interval(3000)
      .subscribe(() => {
        this.loadStartData()
      });
  }

  ngOnDestroy(): void {
    this.thread?.unsubscribe()
  }

  loadStartData() {
    this.workService.getLogs(this.workId)
      .subscribe(data => {
        this.workLogs = data;
      })
  }
}
