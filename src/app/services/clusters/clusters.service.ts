import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cluster, ClusterShort } from 'src/app/models/models';
import Swal from 'sweetalert2';
import { AppConfigService } from '../AppConfigService';

@Injectable({
  providedIn: 'root'
})
export class ClustersService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient) {
    this.apiUrl = environment.config.backendURL + '/api/v1/clusters';
  }

  listCluster(): Observable<ClusterShort[]> {
    return this.http.get<ClusterShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError(this.httpError)
      )
  }

  getCluster(name: string | null): Observable<Cluster> {
    return this.http.get<Cluster>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  postCluster(cluster: Cluster): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/', cluster)
      .pipe(
        catchError(this.httpError)
      )
  }

  deleteCluster(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError(this.httpError)
      )
  }

  putCluster(cluster: Cluster): Observable<any> {
    let name = cluster.name
    return this.http.put<any>(this.apiUrl + '/' + name, cluster)
      .pipe(
        catchError(this.httpError)
      )
  }

  testCluster(name: string): Observable<any> {
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
