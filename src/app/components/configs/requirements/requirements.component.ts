import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/configs/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requirements-config',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {

  requirementsText: string = ""
  butonClicked: boolean = false


  constructor(private configService: ConfigService, private route: Router) { }

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
    this.configService.postRequirements(this.requirementsText)
      .subscribe(() => {
        Swal.fire({
          title: $localize`Requirements sended to install in Agents`,
          icon: 'success',
        }).then(() =>
          this.butonClicked = false
        )
      })
  }
}
