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

    if (error.status == 409) {
      body = error.error
    }

    let errorTittle = error.status == 409 ? body.code : $localize`Service ERROR`
    let errorBody = error.status == 409 ? body.msj : error.message

    this.toastr.error(errorBody, errorTittle)

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = errorBody;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${errorBody}`;
    }
    return throwError(errorMessage);
  }
}
