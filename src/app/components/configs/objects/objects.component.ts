import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/configs/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-objects-config',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  objectsText: string = ""
  replace: boolean = false
  butonClicked: boolean = false


  constructor(private configService: ConfigService, private route: Router) { }

  ngOnInit(): void {
  }

  postRequeriments() {
    this.configService.postObjects(this.objectsText, this.replace)
      .subscribe(() => {
        Swal.fire({
          title: 'Objects updating in Jaime',
          icon: 'success',
        }).then(() =>
          this.butonClicked = false
        )
      })
  }
}
