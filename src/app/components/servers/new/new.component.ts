import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServerService } from 'src/app/services/servers/servers.service';

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

  constructor(private route: Router, private serversService: ServerService, private toastr: ToastrService) { }

  serverTypes: string[] = []

  ngOnInit(): void {
  }

  postServer() {
    this.serversService.postServer(this.serverForm.value)
      .subscribe(() => {
        this.toastr.success($localize`New Server created`)
        this.route.navigate(['servers'])
      })
  }

}
