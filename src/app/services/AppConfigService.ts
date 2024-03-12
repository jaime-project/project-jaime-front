import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private vars: any = {}

    constructor(private http: HttpClient) { }

    loadAppConfig() {
        let request = new XMLHttpRequest()
        request.open('GET', 'assets/appconfig.json', false)
        request.send()

        this.vars = JSON.parse(request.response)
    }

    get config(): any {
        return this.vars;
    }
}
