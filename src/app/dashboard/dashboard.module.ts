import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { StatsComponent } from './stats/stats.component';
import { SliderComponent } from './slider/slider.component';
import { MapComponent } from './map/map.component';
import { RangeComponent } from './slider/range/range.component';
import { ActivityChartComponent } from './charts/activity-chart/activity-chart.component';
import { SourceChartComponent } from './charts/source-chart/source-chart.component';
import { LegendComponent } from './legend/legend.component';

import { CustomMaterialsModule } from '../custom-materials.module';

import { HttpService } from '../services/http.service';
import { LayersService } from '../services/layers.service';
import { TimeService } from '../services/time.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CustomMaterialsModule,
    RouterModule
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
