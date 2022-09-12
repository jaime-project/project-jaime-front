import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/configs';
  }

  getRequirements(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${this.apiUrl}/requirements`, { headers, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  postRequirements(code: string): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/requirements`

    return this.http.post(url, code, { headers, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  postObjects(code: string, replace: boolean): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/objects?replace=${replace}`

    return this.http.post(url, code, { headers, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getObjectsFile(): Observable<Blob> {

    const url = `${this.apiUrl}/objects/file`

    return this.http.get(url, { responseType: "blob" })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getJaimeLogs(): Observable<any> {

    const url = `${this.apiUrl}/logs/jaime`

    return this.http.get(url, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getAgentLogs(id: String): Observable<any> {

    const url = `${this.apiUrl}/logs/agents/${id}`

    return this.http.get(url, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getConfigsVars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vars`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  postConfigsVars(vars: { [key: string]: any }): Observable<any> {
    const url = `${this.apiUrl}/vars`
    return this.http.put(url, vars)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  httpError(error: HttpErrorResponse) {

    this.toastr.error(error.message, $localize`Service ERROR`)

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
