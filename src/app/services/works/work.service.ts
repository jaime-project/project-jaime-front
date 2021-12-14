import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agent, AgentShort, Server, ServerShort, WorkShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';


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

  httpError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
