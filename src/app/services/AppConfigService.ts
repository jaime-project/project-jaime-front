import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private vars: any = {}

    constructor(private http: HttpClient) { }

    loadAppConfig() {
        this.http.get<any>('assets/appconfig.json')
            .subscribe(vars => {
                this.vars = vars
            })
    }

    get config(): any {
        return this.vars;
    }
}
