import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(public router: Router) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // 请求
        let authReq = req.clone({
            headers: req.headers.set('Authorization', 'authToken'),
        });
        return next.handle(authReq).pipe(
            tap(
                // 返回
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        let hr: HttpResponse<any> = event;
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        this.router.navigateByUrl('login');
                    }
                },
                () => {} // complete
            )
        );
    }
}
