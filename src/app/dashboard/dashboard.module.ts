import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

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
import { JakartaChartComponent } from './charts/jakarta-chart/jakarta-chart.component';


@NgModule({
  imports: [
    CommonModule,
    CustomMaterialsModule,
    RouterModule,
    TranslateModule
  ],
  providers: [
    HttpService,
    LayersService,
    TimeService,
    TranslatePipe
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
    LegendComponent,
    JakartaChartComponent
  ]
})
export class DashboardModule { }
