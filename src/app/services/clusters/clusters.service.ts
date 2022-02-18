import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Server as Cluster, ClusterShort } from 'src/app/models/models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClustersService {

  apiUrl: string = environment.backendURL + '/api/v1/clusters';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  listServers(): Observable<ClusterShort[]> {
    return this.http.get<ClusterShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError(this.httpError)
      )
  }

  getServer(name: string | null): Observable<Cluster> {
    return this.http.get<Cluster>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  postServer(cluster: Cluster): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/', cluster)
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteServer(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  putServer(cluster: Cluster): Observable<any> {
    let name = cluster.name
    return this.http.put<any>(this.apiUrl + '/' + name, cluster)
      .pipe(
        catchError(this.httpError)
      )
  }

  listServerTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
      .pipe(
        catchError(this.httpError)
      )
  }

  testServer(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}/test`)
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
