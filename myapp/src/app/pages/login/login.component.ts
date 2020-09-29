import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Config } from '../../classes/config';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

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

    constructor(public http: HttpService, public router: Router) {}

    ngOnInit(): void {}

    onKeydown(e: KeyboardEvent): void {
        if (e.key == 'Enter') {
            this.submit();
        }
    }
    submit(): void {
        this.http.post('/login', this.formData).subscribe((res) => {
            console.log(res);
            if (!res.code) {
                this.router.navigateByUrl('');
            }
        });
    }
}
