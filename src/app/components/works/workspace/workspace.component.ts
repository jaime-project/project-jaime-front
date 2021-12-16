import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from 'src/app/services/works/work.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-workspace-work',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceWorkComponent implements OnInit {

  workId: string = ""

  constructor(private workService: WorkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workId = this.route.snapshot.paramMap.get('id') as string
  }

  downloadWorkspace() {
    this.workService.getWorkspaceWork(this.workId)
      .subscribe(data => {
        saveAs(data, `${this.workId}.zip`);
      })
  }
}
