import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HookService } from 'src/app/services/hooks/hook.service';

@Component({
  selector: 'app-tabs-cron',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsHookComponent implements OnInit {

  selectedTabId = 1
  hookName: string = ""

  constructor(private hookService: HookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')

    this.hookService.getHook(id).subscribe(data => {
      this.hookName = data.name
    })
  }

}
