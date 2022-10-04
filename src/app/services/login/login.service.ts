import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/login/';
  }

  login(user: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { 'user': user, 'pass': password }, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  httpError(error: HttpErrorResponse) {

    this.toastr.error('Invalid user or password', $localize`Login Error`)

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
