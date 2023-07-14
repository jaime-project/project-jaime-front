import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-log-job',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogJobComponent implements OnInit {

  jobId: string | null = ""
  jobLogs: string | null = ""

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  thread: Subscription | null = null

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')

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
    this.jobService.getLogs(this.jobId)
      .subscribe(data => {
        this.jobLogs = data;
      })
  }
}
