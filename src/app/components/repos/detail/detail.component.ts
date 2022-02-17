import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReposService } from 'src/app/services/modules/repos.service';

@Component({
  selector: 'app-detail-repo',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailRepoComponent implements OnInit {

  name: string = ""
  repo: any = {}

  constructor(private repoService: ReposService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('repo')!

    this.repoService.getRepo(this.name)
      .subscribe(data => {
        this.repo = data
      })
  }

}
