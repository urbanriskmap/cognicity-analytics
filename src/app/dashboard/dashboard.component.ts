import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { ChartsComponent } from './charts/charts.component';
import { FbAdsComponent } from './fb-ads/fb-ads.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(ChartsComponent)
  private chartsComponent: ChartsComponent;

  @ViewChild(FbAdsComponent)
  private fbAdsComponent: FbAdsComponent;

  constructor(
    private translate: TranslateService
  ) { }

  resizeComponents() {
    const mapHeight = $(window).height() - $('#navBar').height() - $('#analyticsWrapper').height();
    $('#mapWrapper').height(mapHeight);
    $('#sliderWrapper').height(mapHeight - 24);
  }

  currentChart() {
    return this.chartsComponent.selectedChart;
  }

  getAdList() {
    return this.fbAdsComponent.adCreatives;
  }

  ngOnInit() {
    this.resizeComponents();
    $(window).resize(() => {
      this.resizeComponents();
    });
  }

}
