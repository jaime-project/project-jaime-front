import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocsService {

  apiUrl: string = environment.backendURL + '/api/v1/docs';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  listDocs(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
      .pipe(
        catchError(this.httpError)
      )
  }

  postDocs(name: string | null, docs: string | null): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(this.apiUrl + '/' + name, docs, { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  getDocs(name: string | null): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.get(this.apiUrl + '/' + name, { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteDocs(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  putDocs(name: string | null, content: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.put(this.apiUrl + '/' + name, content, { headers })
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
