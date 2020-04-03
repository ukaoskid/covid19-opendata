import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FindCovid } from './models/find-covid.interface';
import * as lodash from 'lodash';
import * as moment from 'moment';
import { Covid19DataService } from './services/covid/covid19-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isError = false;
  loading = false;
  nation: string = 'Italy';
  lastUpdate: string = '';
  trendHistData: any[] = [];
  growthFactor: any[] = [];
  totalizers: any[];

  @ViewChild('graphContainer', {static: true})
  graphContainer: ElementRef;

  constructor(private covid: Covid19DataService) {
  }

  ngOnInit(): void {
    this.computeChart();
  }

  computeChart() {

    this.isError = false;
    this.loading = true;

    const find: FindCovid = {
      selector: {
        country: this.nation,
        lastUpdate: { $gte: Date.now() - (30 * 24 * 60 * 60 * 1000) }
      }
    };

    this.covid.findData(find).then((data: any) => {

      if (!data || !data.payload) {
        this.isError = true;
        this.loading = false;
        return;
      }

      if (data.payload.status === 'error') {
        this.isError = true;
        this.loading = false;
        return;
      }

      const payload = data.payload.docs;

      // Grouping per issue datetime.
      const issueDateMap = new Map<number, { confirmed: number, deaths: number, recovered: number }>();
      payload.map((row: any) => {

        const deltas = {
          confirmed: row.confirmed,
          deaths: row.deaths,
          recovered: row.recovered,
        };
        const existingDelta = issueDateMap.get(row.issueDatetime);

        if (existingDelta) {
          deltas.confirmed += existingDelta.confirmed;
          deltas.deaths += existingDelta.deaths;
          deltas.recovered += existingDelta.recovered;
        }
        issueDateMap.set(row.issueDatetime, deltas)
      });

      // Converting the map into an object.
      let groupedData = [];
      issueDateMap.forEach((value, key) => {
        const record = {
          datetime: key,
          confirmed: value.confirmed,
          deaths: value.deaths,
          recovered: value.recovered,
        };

        groupedData.push(record);
      });

      // Ordering and reducing to get deltas.
      groupedData = lodash.orderBy(groupedData, ['datetime'], ['asc']);
      groupedData.reduce((previousValue, currentValue) => {

        const gfConfirmed = currentValue.confirmed / previousValue.confirmed;
        const gfDeaths = currentValue.deaths / previousValue.deaths;
        const gfRecovered = currentValue.recovered / previousValue.recovered;

        currentValue.deltas = {
          deltaConfirmed: currentValue.confirmed - previousValue.confirmed,
          deltaDeaths: currentValue.deaths - previousValue.deaths,
          deltaRecovered: currentValue.recovered - previousValue.recovered,
          gfConfirmed: isNaN(gfConfirmed) || !isFinite(gfConfirmed) ? 1 : gfConfirmed,
          gfDeaths: isNaN(gfDeaths) || !isFinite(gfDeaths) ? 1 : gfDeaths,
          gfRecovered: isNaN(gfRecovered) || !isFinite(gfRecovered) ? 1 : gfRecovered,
        };

        return currentValue;
      });

      this.computeTotals(groupedData);
      this.computeTrendHistogram(groupedData);
      this.computeGrowthFactor(groupedData);

      this.covid.getConfig().then((data: any) => {

        if (data) {
          this.lastUpdate = moment(data.payload.datetime).format('YYYY-MM-DD HH:MM:SS');
        }
      });

      this.loading = false;
    });
  }

  computeTotals(data: any[]) {

    const cfr = (data[data.length - 1].deaths /
      (data[data.length - 1].confirmed +
        data[data.length - 1].deaths +
        data[data.length - 1].recovered)) * 100;
    const tmpTotals = [
      {name: 'Confirmed', value: data[data.length - 1].confirmed},
      {name: 'Deaths', value: data[data.length - 1].deaths},
      {name: 'Recovered', value: data[data.length - 1].recovered},
      {name: 'CFR %', value: Math.round(cfr * 100) / 100}];

    this.totalizers = [...tmpTotals];
  }

  computeTrendHistogram(data: any[]) {

    const tempTrendHist = [];

    data.forEach((record: any) => {

      if (record.deltas) {

        tempTrendHist.push({
          name: moment(record.datetime).format('YYYY-MM-DD'),
          series: [
            {name: 'Confirmed', value: record.deltas.deltaConfirmed},
            {name: 'Deaths', value: record.deltas.deltaDeaths},
            {name: 'Recovered', value: record.deltas.deltaRecovered},
          ]
        });
      }
    });

    this.trendHistData = [...tempTrendHist];
  }

  computeGrowthFactor(data: any[]) {

    const tempGrowthFactor = [
      {name: 'Confirmed', series: []},
      {name: 'Deaths', series: []},
      {name: 'Recovered', series: []},
    ];

    data.forEach((record: any) => {

      if (record.deltas) {

        // Growth factor Confirmed.
        tempGrowthFactor[0].series.push({
          name: moment(record.datetime).format('YYYY-MM-DD'),
          value: record.deltas.gfConfirmed,
        });

        // Growth factor Deaths.
        tempGrowthFactor[1].series.push({
          name: moment(record.datetime).format('YYYY-MM-DD'),
          value: record.deltas.gfDeaths,
        });

        // Growth factor Recovered.
        tempGrowthFactor[2].series.push({
          name: moment(record.datetime).format('YYYY-MM-DD'),
          value: record.deltas.gfRecovered,
        });
      }
    });

    this.growthFactor = [...tempGrowthFactor];
  }

  changeNation(nation: string) {

    this.totalizers = undefined;
    this.nation = nation;
    this.computeChart();
  }
}
