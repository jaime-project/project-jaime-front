import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {


  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private route: Router) {
  }

  httpError(error: HttpErrorResponse) {

    let body: any = {}

    if (error.status == 401 || error.status == 403) {
      this.toastr.warning("Please login again", $localize`Session expired`)
      this.route.navigate(['/']);
      return throwError("Session expired")
    }

    if (error.status == 409) {
      body = error.error
      if (typeof (body) == 'string') {
        body = JSON.parse(error.error)
      }
    }

    let errorTittle = error.status == 409 ? body.code : $localize`Unknow error on service`
    let errorBody = error.status == 409 ? body.msj : error.message

    this.toastr.error(errorBody, errorTittle)

    return throwError(errorBody);
  }
}
