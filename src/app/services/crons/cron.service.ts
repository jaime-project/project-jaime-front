import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CronShort } from 'src/app/models/models';
import Swal from 'sweetalert2';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class CronService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient) {
    this.apiUrl = environment.config.backendURL + '/api/v1/crons';
  }


  getCronsAllShort(): Observable<CronShort[]> {
    return this.http.get<CronShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteCron(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id)
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteCronsByStatus(status: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/?status=' + status)
      .pipe(
        catchError(this.httpError)
      )
  }

  postCron(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
      .pipe(
        catchError(this.httpError)
      )
  }

  getCron(id: string | null): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        catchError(this.httpError)
      )
  }

  changeStatus(id: string, status: string): Observable<any> {

    return this.http.patch(`${this.apiUrl}/${id}/status/${status}`, {}, { responseType: 'blob' })
      .pipe(
        catchError(this.httpError)
      )
  }

  getCronStatus(): Observable<any> {

    return this.http.get<string[]>(`${this.apiUrl}/status`)
      .pipe(
        catchError(this.httpError)
      )
  }

  putCron(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.put(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
      .pipe(
        catchError(this.httpError)
      )
  }


  httpError(error: HttpErrorResponse) {
    Swal.fire({
      title: 'Service ERROR',
      text: error.error.response,
      icon: 'error',
      confirmButtonColor: '#05b281'
    })

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
