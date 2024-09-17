import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CronService } from 'src/app/services/crons/cron.service';

@Component({
  selector: 'app-tabs-cron',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsCronComponent implements OnInit {

  selectedTabId = 1
  cronName: string = ""

  constructor(private cronService: CronService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.cronService.getCron(id).subscribe(data => {
      this.cronName = data.name
    })
  }

}
