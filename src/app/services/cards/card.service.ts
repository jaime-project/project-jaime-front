import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Card, CardShort } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/cards';
  }


  getCardsAllShort(filter: string): Observable<CardShort[]> {
    let url = this.apiUrl + '/all/short?'

    if (filter) {
      url += `&filter=${filter}`
    }

    return this.http.get<CardShort[]>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteCard(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  postCard(card: Card | null): Observable<any> {
    return this.http.post(this.apiUrl + '/', card)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getCard(id: string | null): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  putCard(id: string | null, yaml: string | null): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, yaml)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  postDefaultDoc(id: string | null, yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(`${this.apiUrl}/${id}/docs`, yaml, { headers, responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  putDefaultDoc(id: string | null, yaml: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.put(`${this.apiUrl}/${id}/docs`, yaml, { headers, responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getDefaultDoc(id: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/docs`, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  runCard(id: string | null, params: any | null): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(`${this.apiUrl}/${id}/run`, params, { headers, responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }
}
