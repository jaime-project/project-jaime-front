import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HookShort } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class HookService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/hooks';
  }


  getHooksAllShort(size: number, page: number, filter: string, order: string): Observable<HookShort[]> {
    let url = this.apiUrl + '/all/short?'

    if (size && page) {
      url += `&size=${size}&page=${page}`
    }

    if (filter) {
      url += `&filter=${filter}`
    }


    if (order) {
      url += `&order=${order}`
    }

    return this.http.get<HookShort[]>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteHook(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteHooksByStatus(status: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/?status=' + status)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  postHook(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getHook(id: string | null): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  changeStatus(id: string, status: string): Observable<any> {

    return this.http.patch(`${this.apiUrl}/${id}/status/${status}`, {}, { responseType: 'blob' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getHookStatus(): Observable<any> {

    return this.http.get<string[]>(`${this.apiUrl}/status`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  putHook(yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.put(this.apiUrl + '/', yaml, { headers, responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

}
