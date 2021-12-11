import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server, ServerShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';


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