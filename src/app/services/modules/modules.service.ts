import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  apiUrl: string = environment.backendURL + '/api/v1/repos';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  listModules(repo: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${repo}/modules`)
      .pipe(
        catchError(this.httpError)
      )
  }

  getModule(name: string, repo: string): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/modules/${name}`

    return this.http.get(url, { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  postModule(name: string, code: string, repo: string): Observable<string> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/modules/${name}`

    return this.http.post(url, code, { headers, responseType: 'text' })
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteModule(name: string, repo: string): Observable<any> {
    const url = `${this.apiUrl}/${repo}/modules/${name}`

    return this.http.delete<any>(url)
      .pipe(
        catchError(this.httpError)
      )
  }

  putModule(name: string, code: string, repo: string): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = `${this.apiUrl}/${repo}/modules/${name}`

    return this.http.put(url, code, { headers })
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
