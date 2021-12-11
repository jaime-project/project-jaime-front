import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-server',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewServerComponent implements OnInit {

  serverForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    user: new FormControl(''),
    token: new FormControl(''),
    type: new FormControl(''),
    version: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  postServer() {
    console.warn(this.serverForm.value);
  }

}
