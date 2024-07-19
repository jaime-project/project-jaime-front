import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileList, Server, ServerShort } from 'src/app/models/models';
import { AppConfigService } from '../AppConfigService';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient, private toastr: ToastrService, private errorService: ErrorService) {
    this.apiUrl = environment.config.backendURL + '/api/v1/storage';
  }

  getFileList(path: string, filter: string | null = null): Observable<FileList> {
    let url = `${this.apiUrl}?path=${path}`

    if (filter) {
      url += `&filter=${filter}`
    }

    return this.http.get<FileList>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }

  delete(name: string, path: string): Observable<any> {
    let url = `${this.apiUrl}/${name}?path=${path}`

    return this.http.delete<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.httpError(error);
        })
      )
  }
}
