import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cluster, ClusterShort } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class ClustersService {

  apiUrl: string = "";

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/clusters';
  }

  listCluster(): Observable<ClusterShort[]> {
    return this.http.get<ClusterShort[]>(this.apiUrl + '/all/short')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getCluster(name: string | null): Observable<Cluster> {
    return this.http.get<Cluster>(this.apiUrl + '/' + name)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  postCluster(cluster: Cluster): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/', cluster)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteCluster(name: string | null): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  putCluster(cluster: Cluster): Observable<any> {
    let name = cluster.name
    return this.http.put<any>(this.apiUrl + '/' + name, cluster)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  testCluster(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}/test`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  exportYaml(name: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/yamls`
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(url, { headers, responseType: "blob" })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

}
