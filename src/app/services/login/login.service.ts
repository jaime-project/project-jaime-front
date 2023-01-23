import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../AppConfigService';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private environment: AppConfigService, private http: HttpClient) { }

  login(user: string, password: string): Observable<any> {
    return this.http.post(this.environment.config.backendURL + '/api/v1/login/', { 'user': user, 'password': password }, { responseType: 'text' })
  }
}
