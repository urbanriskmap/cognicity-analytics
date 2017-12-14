import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {
  @Input() floodAreasCount: number;
  @Input() reportsCount: number;
  @Input() isRefreshing: boolean;

  constructor() { }

  ngOnInit() {
  }
}
