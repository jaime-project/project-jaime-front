import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/login/';
  }

  login(user: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { 'user': user, 'password': password }, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }
}
