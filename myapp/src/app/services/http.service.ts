import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Config } from '../classes/config';
import { MyResponse } from '../classes/my-response';
@Injectable({
    providedIn: 'root',
})
export class HttpService {
    httpOptions: Object = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        // withCredentials: true,
    };
    constructor(public http: HttpClient) {}

    get(url: string) {
        return this.http.get<MyResponse>(
            Config.httpUrl + url,
            this.httpOptions
        );
    }
    post(url: string, params?: {}) {
        return this.http.post<MyResponse>(
            Config.httpUrl + url,
            params,
            this.httpOptions
        );
    }

    httpHandler(observable: Observable<Object>): Subscription {
        return observable.subscribe(
            (res) => {
                console.log('res', res);
            },
            (err) => {
                console.log('err', err);
            },
            () => {
                console.log('complete');
            }
        );
    }
}
