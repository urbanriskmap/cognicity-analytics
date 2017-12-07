import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { StatsComponent } from './stats/stats.component';
import { SliderComponent } from './slider/slider.component';
import { MapComponent } from './map/map.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, ChartsComponent, StatsComponent, SliderComponent, MapComponent]
})
export class DashboardModule { }
