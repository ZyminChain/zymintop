import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../classes/config';
@Injectable({
    providedIn: 'root',
})
export class HttpService {
    httpOptions: Object = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    constructor(public http: HttpClient) {}

    get(url: string): Object {
        return this.httpHandler(
            this.http.get(Config.httpUrl + url, this.httpOptions)
        );
    }
    post(url: string, params: {}): Object {
        return this.httpHandler(
            this.http.post(Config.httpUrl + url, params, this.httpOptions)
        );
    }

    httpHandler(observable: Observable<Object>) {
        observable.subscribe(
            (res) => {
                console.log('res', res);
                return res;
            },
            (err) => {
                console.log('err', err);
            },
            () => {
                console.log('complete');
            }
        );
        return {};
    }
}
