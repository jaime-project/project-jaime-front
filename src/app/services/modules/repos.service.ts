import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ReposService {

  apiUrl: string = environment.backendURL + '/api/v1/repos';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  listRepos(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
      .pipe(
        catchError(this.httpError)
      )
  }

  listReposByType(typeRepo: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?type=${typeRepo}`)
      .pipe(
        catchError(this.httpError)
      )
  }

  listReposTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
      .pipe(
        catchError(this.httpError)
      )
  }

  postRepos(repo: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + '/', repo)
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteRepos(name: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  reloadRepos(name: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/reload`
    return this.http.post<any>(url, {})
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
