import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Config } from '../../classes/config';
import { from, Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public httpUrl: string = Config.httpUrl;

    public logoUrl: string = this.httpUrl + '/images/favicon.ico';

    public formData: any = {
        account: '',
        password: '',
    };

    constructor(public http: HttpService) {}

    ngOnInit(): void {
        this.test();
    }

    test() {
        let ob = from([
            new Observable((s) => {
                setTimeout(() => {
                    s.next(1);
                    s.complete();
                    console.log(1111);
                }, 2000);
            }),
            new Observable((s) => {
                setTimeout(() => {
                    s.next(22);
                    s.complete();
                    console.log(222);
                }, 2000);
            }),
            new Observable((s) => {
                setTimeout(() => {
                    s.next(33);
                    s.complete();
                    console.log(3333);
                }, 2000);
            }),
        ]);

        ob.subscribe(
            (res) => {
                console.log('res', res);
                res.subscribe((ress) => {
                    console.log('ress', ress);
                });
            },
            (err) => {
                console.log('err', err);
            },
            () => {
                console.log('complete');
            }
        );
    }

    onKeydown(e: KeyboardEvent): void {
        if (e.key == 'Enter') {
            this.submit();
        }
    }
    submit(): void {
        this.test();
        return;
        console.log(this.http.get('/login'));
    }
}
