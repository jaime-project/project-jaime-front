import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class DocsService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient) {
    this.apiUrl = environment.config.backendURL + '/api/v1/repos';
  }

  listDocs(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
      .pipe(
        catchError(this.httpError)
      )
  }

  postDocs(name: string, docs: string, repo: string): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/docs/${name}`

    return this.http.post(url, docs, { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  getDocs(name: string, repo: string): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/docs/${name}`

    return this.http.get(url, { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteDocs(name: string, repo: string): Observable<string> {

    const url = `${this.apiUrl}/${repo}/docs/${name}`

    return this.http.delete<any>(url)
      .pipe(
        catchError(this.httpError)
      )
  }

  getDocsWithoutError(name: string, repo: string): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/docs/${name}`

    return this.http.get(url, { headers, responseType: 'text' })
  }

  putDocs(name: string, content: string, repo: string): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/docs/${name}`

    return this.http.put(url, content, { headers })
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
