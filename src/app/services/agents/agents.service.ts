import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agent, AgentShort } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/agents';
  }

  getAgentsAll(): Observable<AgentShort[]> {
    return this.http.get<AgentShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  getAgent(id: string | null): Observable<Agent> {
    return this.http.get<Agent>(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  deleteAgent(id: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpError(error);
        })
      )
  }

  listAgentsTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
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
