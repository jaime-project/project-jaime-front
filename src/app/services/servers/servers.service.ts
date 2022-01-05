import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server, ServerShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  apiUrl: string = environment.backendURL + '/api/v1/servers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  listServers(): Observable<ServerShort[]> {
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

  postServer(server: Server): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/', server)
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

  putServer(server: Server): Observable<any> {
    let name = server.name
    return this.http.put<any>(this.apiUrl + '/' + name, server)
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
