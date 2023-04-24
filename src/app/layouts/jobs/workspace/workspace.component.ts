import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/jobs/job.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-workspace-job',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceJobComponent implements OnInit {

  workId: string = ""

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workId = this.route.snapshot.paramMap.get('id') as string
  }

  downloadWorkspace() {
    this.jobService.getWorkspacejob(this.workId)
      .subscribe(data => {
        saveAs(data, `${this.workId}.zip`);
      })
  }
}
