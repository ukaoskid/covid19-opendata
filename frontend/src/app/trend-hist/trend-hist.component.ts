import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trend-hist',
  templateUrl: './trend-hist.component.html',
  styleUrls: ['./trend-hist.component.scss']
})
export class TrendHistComponent implements OnInit {

  @Input()
  data: any[];

  @Input()
  view: any[];

  customColors = [
    { name: 'Confirmed', value: '#ffce3b' },
    { name: 'Deaths', value: '#ff4343' },
    { name: 'Recovered', value: '#41be37' },
  ];

  constructor() { }

  ngOnInit() {
  }
}
