import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkShort } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class WorkService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/works';
  }

  getWorksAllShort(): Observable<WorkShort[]> {
    return this.http.get<WorkShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  deleteWork(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  deleteWorksByStatus(status: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/?status=' + status)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getLogs(id: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(this.apiUrl + '/' + id + '/logs', { headers, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  postWork(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getWork(id: string | null): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getWorkspaceWork(id: string | null): Observable<any> {

    return this.http.get(`${this.apiUrl}/${id}/workspace`, { responseType: 'blob' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  changeStatus(id: string, status: string): Observable<any> {

    return this.http.patch(`${this.apiUrl}/${id}/status/${status}`, {}, { responseType: 'blob' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getWorkStatus(): Observable<any> {

    return this.http.get<string[]>(`${this.apiUrl}/status`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  putWork(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.put(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
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
