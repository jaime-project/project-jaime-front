import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServerService } from 'src/app/services/servers/servers.service';

@Component({
  selector: 'app-new-server',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewServerComponent implements OnInit {

  serverForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    host: new UntypedFormControl(''),
    port: new UntypedFormControl(''),
    user: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
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
