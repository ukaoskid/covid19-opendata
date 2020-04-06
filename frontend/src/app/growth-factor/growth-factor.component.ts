import { Component, Input, OnInit } from '@angular/core';
import { curveBasis } from 'd3-shape';

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

  curve: any = curveBasis;
  customColors = [
    { name: 'Confirmed', value: '#ffce3b' },
    { name: 'Deaths', value: '#ff4343' },
    { name: 'Recovered', value: '#41be37' },
  ];

  constructor() { }

  ngOnInit() {
  }
}
