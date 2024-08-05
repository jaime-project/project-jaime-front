import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-tabs-job',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsJobComponent implements OnInit {

  selectedTabId = 1
  jobName: string = ""

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let jobId = this.route.snapshot.paramMap.get('id') as string

    this.jobService.getJob(jobId)
      .subscribe(data => {
        this.jobName = data.name
      })
  }

}
