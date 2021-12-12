import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agent, Server, ServerShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  apiUrl: string = environment.backendURL + '/api/v1/agents';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  getAgentsAll(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl + '/')
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
