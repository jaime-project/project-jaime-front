import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/servers/servers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-server',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewServerComponent implements OnInit {

  serverForm = new FormGroup({
    name: new FormControl(''),
    host: new FormControl(''),
    port: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private route: Router, private serversService: ServerService) { }

  serverTypes: string[] = []

  ngOnInit(): void {

    this.serversService.listServerTypes()
      .subscribe(data => {
        this.serverTypes = data.sort()
      })
  }

  postServer() {
    this.serversService.postServer(this.serverForm.value)
      .subscribe(() => {
        Swal.fire({
          title: $localize`New Server created`,
          icon: 'success',
        }).then(() =>
          this.route.navigate(['servers'])
        )
      })
  }

}
