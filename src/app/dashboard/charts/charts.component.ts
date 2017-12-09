import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnInit {
  @Input() someValue: number;
  @Input() otherValue: number;

  constructor() { }

  ngOnInit() {
  }

}
