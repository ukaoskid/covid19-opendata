import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-totalizers',
  templateUrl: './totalizers.component.html',
  styleUrls: ['./totalizers.component.scss']
})
export class TotalizersComponent implements OnInit {

  @Input()
  data: any[];

  @Input()
  view: any[];

  colorScheme = { domain: ['#ffce3b', '#ff4343', '#41be37', '#ff4343'] };
  cardColor: string = '#232837';

  constructor() { }

  ngOnInit() {
  }
}
