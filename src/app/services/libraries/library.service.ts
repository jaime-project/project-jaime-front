import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';
import { Library, LibraryShort } from 'src/app/models/models';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/libraries';
  }

  getLibrariesAllShort(size: number, page: number, filter: string, order: string): Observable<LibraryShort[]> {

    let url = this.apiUrl + '/all/short?'

    if (size && page) {
      url += `size=${size}&page=${page}`
    }

    if (filter) {
      url += `&filter=${filter}`
    }


    if (order) {
      url += `&order=${order}`
    }

    return this.http.get<LibraryShort[]>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  getLibrary(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  postLibrary(library: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + '/', library)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  deleteLibrary(name: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + name)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  putLibrary(library: Library): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/', library)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  reloadLibrary(name: string): Observable<any> {
    const url = `${this.apiUrl}/${name}/reload`
    return this.http.post<any>(url, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  exportLibrary(name: string): Observable<any> {
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
