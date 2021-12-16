import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServersService } from 'src/app/services/servers/servers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-server',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewServerComponent implements OnInit {

  serverForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    token: new FormControl(''),
    type: new FormControl(''),
    version: new FormControl(''),
  });

  constructor(private serversService: ServersService) { }

  ngOnInit(): void {
  }

  postServer() {
    this.serversService.postServer(this.serverForm.value)
      .subscribe(() => {
        Swal.fire({
          title: 'New Server created',
          icon: 'success',
        }).then(() =>
          window.location.reload()
        )
      })
  }

}
