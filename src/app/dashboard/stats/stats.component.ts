import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() floodAreasCount: number;
  @Input() reportsCount: number;
  @Input() isRefreshing: boolean;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }
}
