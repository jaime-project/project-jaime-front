import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';


@Injectable({
  providedIn: 'root'
})
export class ReposService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/repos';
  }


  listRepos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getRepo(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  listReposByType(typeRepo: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/?type=${typeRepo}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  listReposTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  postRepos(repo: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + '/', repo)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteRepos(name: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  reloadRepos(name: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/reload`
    return this.http.post<any>(url, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  exportRepo(name: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/objects`
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(url, { headers, responseType: "blob" })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }
}
