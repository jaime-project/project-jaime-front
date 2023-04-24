import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/configs/config.service';

@Component({
  selector: 'app-objects-config',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  objectsText: string = ""
  replace: boolean = false
  pageLoading: boolean = false


  constructor(private configService: ConfigService, private route: Router, private toastr: ToastrService, private hotkeysService: HotkeysService) {
    this.hotkeysService.add(new Hotkey(['alt+s'], (event: KeyboardEvent): boolean => {
      this.postRequeriments()
      return false;
    }));
  }

  ngOnInit(): void {
  }

  postRequeriments() {

    this.pageLoading = true

    this.configService.postYamls(this.objectsText, this.replace)
      .subscribe(() => {
        this.toastr.success($localize`Objects updating in Jaime`)
        this.pageLoading = false
      })
  }
}
