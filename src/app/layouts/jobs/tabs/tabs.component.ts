import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-tabs-job',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsJobComponent implements OnInit {

  selectedTabId = 1
  jobName: string = ""
  jobStatus: string = ""
  thread: Subscription | null = null

  constructor(private jobService: JobService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.loadStartData()

    this.thread = interval(1000)
      .subscribe(() => {
        this.loadStartData()
      });


  }


  loadStartData() {
    let jobId = this.route.snapshot.paramMap.get('id') as string

    this.jobService.getJob(jobId)
      .subscribe(data => {
        this.jobName = data.name
        this.jobStatus = data.status
      })
  }



}
