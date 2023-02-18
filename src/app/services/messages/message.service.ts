import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message, MessageShort, Server } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/messages';
  }

  listMessages(size: number, page: number, filter: string, order: string): Observable<MessageShort[]> {
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

    return this.http.get<MessageShort[]>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getMessage(name: string | null): Observable<Message> {
    return this.http.get<Message>(this.apiUrl + '/' + name)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteMessage(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  listMessageStatus(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/status`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteMessagesByStatus(type: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/status/${type}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }
}
