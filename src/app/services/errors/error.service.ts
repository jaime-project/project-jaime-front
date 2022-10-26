import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {


  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService) {
  }

  httpError(error: HttpErrorResponse) {

    let errorTittle = error.status == 409 ? error.error.code : $localize`Service ERROR`
    let errorBody = error.status == 409 ? error.error.msj : error.message

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
