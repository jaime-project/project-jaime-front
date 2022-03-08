import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from "../../assets/appconfig.json";

@Injectable()
export class AppConfigService {

    private appConfig: any;

    constructor(private httpClient: HttpClient) { }

    loadAppConfig() {
        this.appConfig = config;
    }

    get config() {
        return this.appConfig;
    }
}
