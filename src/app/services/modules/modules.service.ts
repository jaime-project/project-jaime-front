import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server, ServerShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  apiUrl: string = environment.backendURL + '/api/v1/modules';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  listModules(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
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

  deleteModule(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
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
