import * as lodash from 'lodash';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Covid19DataService } from '../services/covid/covid19-data.service';
import { FindCovid } from '../models/find-covid.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  nation = 'Italy';
  lastUpdate: string = '';
  backendVersion: string = '';

  // Options.
  customColors = [
    { name: 'Confirmed', value: '#ffce3b' },
    { name: 'Deaths', value: '#ff4343' },
    { name: 'Recovered', value: '#41be37' },
  ];

  covidData: any[] = [];
  covidChart: any[] = [];

  constructor(private covid: Covid19DataService) { }

  ngOnInit() {
    this.computeChart();
  }

  computeChart() {

    const find: FindCovid = {
      selector: {
        country: this.nation,
        lastUpdate: { $gte: Date.now() - (30 * 24 * 60 * 60 * 1000) }
      }
    };

    this.covid.findData(find).then((data: any) => {

      const payload = data.payload.docs;
      this.covidData = lodash.orderBy(payload, ['lastUpdate'], ['asc']);

      this.covidData.reduce((previousValue, currentValue) => {

        currentValue.deltas = {
          deltaConfirmed: currentValue.confirmed - previousValue.confirmed,
          deltaDeaths: currentValue.deaths - previousValue.deaths,
          deltaRecovered: currentValue.recovered - previousValue.recovered,
        };

        return currentValue;
      });

      const tempData = [];
      this.covidData.forEach((record: any) => {

        if (record.deltas && (record.deltas.deltaConfirmed > 0 && record.deltas.deltaDeaths > 0 && record.deltas.deltaRecovered > 0)) {

          const data = {
            name: moment(record.lastUpdate).format('YYYY-MM-DD'),
            series: [
              { name: 'Confirmed', value: record.deltas.deltaConfirmed },
              { name: 'Deaths', value: record.deltas.deltaDeaths },
              { name: 'Recovered', value: record.deltas.deltaRecovered },
            ]
          };

          tempData.push(data);
        }
      });

      this.covidChart = [...tempData];

      this.covid.getConfig().then((data: any) => {

        if (data) {
          this.lastUpdate = moment(data.payload.datetime).format('YYYY-MM-DD HH:MM:SS');
          this.backendVersion = data.payload.version;
        }
      });
    });
  }

  changeNation(nation: string) {
    this.nation = nation;
    this.computeChart();
  }
}
