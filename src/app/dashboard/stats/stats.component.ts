import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {
  @Input() statVal: number;

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.statVal += 1;
  }

  decrement() {
    this.statVal -= 1;
  }
}
