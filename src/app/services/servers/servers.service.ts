import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server as Server, ServerShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AppConfigService } from '../AppConfigService';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient) {
    this.apiUrl = environment.config.backendURL + '/api/v1/servers';
  }
  listServer(): Observable<ServerShort[]> {
    return this.http.get<ServerShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError(this.httpError)
      )
  }

  getServer(name: string | null): Observable<Server> {
    return this.http.get<Server>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  postServer(cluster: Server): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/', cluster)
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteServer(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  putServer(cluster: Server): Observable<any> {
    let name = cluster.name
    return this.http.put<any>(this.apiUrl + '/' + name, cluster)
      .pipe(
        catchError(this.httpError)
      )
  }

  listServerTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
      .pipe(
        catchError(this.httpError)
      )
  }

  testServer(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}/test`)
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
