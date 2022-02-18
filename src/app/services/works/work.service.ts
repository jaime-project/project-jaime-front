import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class WorkService {

  apiUrl: string = environment.backendURL + '/api/v1/works';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getWorksAllShort(): Observable<WorkShort[]> {
    return this.http.get<WorkShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteWork(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id)
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteWorksByStatus(status: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/?status=' + status)
      .pipe(
        catchError(this.httpError)
      )
  }

  getLogs(id: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(this.apiUrl + '/' + id + '/logs', { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  postWork(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
      .pipe(
        catchError(this.httpError)
      )
  }

  getWork(id: string | null): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        catchError(this.httpError)
      )
  }

  getWorkspaceWork(id: string | null): Observable<any> {

    return this.http.get(`${this.apiUrl}/${id}/workspace`, { responseType: 'blob' })
      .pipe(
        catchError(this.httpError)
      )
  }

  httpError(error: HttpErrorResponse) {
    Swal.fire({
      title: 'Service ERROR',
      text: error.error.message,
      icon: 'error',
      confirmButtonColor: '#05b281'
    })

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
