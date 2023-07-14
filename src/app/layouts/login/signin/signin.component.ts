import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userPassForm = new UntypedFormGroup({
    user: new UntypedFormControl(''),
    pass: new UntypedFormControl('')
  });

  constructor(private route: Router, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {

    let user = this.userPassForm.value['user']
    let pass = this.userPassForm.value['pass']

    this.loginService.login(user, pass)
      .subscribe(
        token => {
          localStorage.setItem('JAIME_TOKEN', token)
          this.route.navigate(['clusters'])
        },
        error => {
          this.toastr.warning('Invalid user or password', 'Login error')
        }
      )
  }

}
