import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Echarts, EChartOption } from 'echarts';
import { HttpService } from 'src/app/services/http.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    @ViewChild('myCharts') myCharts: ElementRef;

    options: EChartOption;
    optionsNew: EChartOption = {};

    adminList: Array<any>;
    constructor(public http: HttpService) {}

    ngOnInit(): void {
        const xAxisData = [];
        const data1 = [];
        const data2 = [];

        for (let i = 0; i < 100; i++) {
            xAxisData.push('category' + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        this.options = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                },
            ],
        };

        this.getAdminList();
    }
    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
    }
    test() {
        let series = this.options.series;
        series.push({
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
        });
        this.optionsNew = { series: series };
    }

    getAdminList() {
        this.http.get('/admin/list').subscribe((res) => {
            this.adminList = res.data;
        });
    }
}
