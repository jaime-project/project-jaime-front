import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-requirements-config',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {

  requirementsText: string = ""
  pageLoading: boolean = false


  constructor(private configService: ConfigService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadStartData()
  }

  loadStartData() {
    this.configService.getRequirements()
      .subscribe(data => {
        this.requirementsText = data;
      })
  }

  postRequeriments() {
    
    this.pageLoading = true
    
    this.configService.postRequirements(this.requirementsText)
      .subscribe(() => {
        this.toastr.success($localize`Requirements sended to install in Agents`)
        this.pageLoading = false
      })
  }
}
