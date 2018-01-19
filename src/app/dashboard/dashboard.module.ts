import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { StatsComponent } from './stats/stats.component';
import { SliderComponent } from './slider/slider.component';
import { MapComponent } from './map/map.component';
import { HttpService } from '../services/http.service';
import { LayersService } from '../services/layers.service';
import { TimeService } from '../services/time.service';
import { HttpClientModule } from '@angular/common/http';
import { RangeComponent } from './slider/range/range.component';
import { ActivityChartComponent } from './charts/activity-chart/activity-chart.component';
import { SourceChartComponent } from './charts/source-chart/source-chart.component';
import { LegendComponent } from './legend/legend.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    LayersService,
    TimeService
  ],
  declarations: [
    DashboardComponent,
    ChartsComponent,
    StatsComponent,
    SliderComponent,
    MapComponent,
    RangeComponent,
    ActivityChartComponent,
    SourceChartComponent,
    LegendComponent
  ]
})
export class DashboardModule { }
