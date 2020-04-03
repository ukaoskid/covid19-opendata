import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { curveLinear } from 'd3-shape';

@Component({
  selector: 'app-growt-factor',
  templateUrl: './growth-factor.component.html',
  styleUrls: ['./growth-factor.component.scss']
})
export class GrowthFactorComponent implements OnInit {

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
