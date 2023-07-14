import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReposService } from 'src/app/services/modules/repos.service';
import { Document } from 'yaml';

@Component({
  selector: 'app-yaml-repo',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlRepoComponent implements OnInit {

  name: string = ""
  contentYaml: string = ""


  constructor(private repoService: ReposService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('repo')!

    this.repoService.getRepo(this.name)
      .subscribe(data => {

        let doc = new Document()
        doc.contents = data
        this.contentYaml = doc.toString()
      })
  }

}
