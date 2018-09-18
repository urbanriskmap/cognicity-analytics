import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslatePipe, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { FbAdsComponent } from './fb-ads/fb-ads.component';
import { AdCreativeComponent } from './fb-ads/ad-creative/ad-creative.component';
import { StatsComponent } from './stats/stats.component';
import { SliderComponent } from './slider/slider.component';
import { MapComponent } from './map/map.component';
import { RangeComponent } from './slider/range/range.component';
import { ActivityChartComponent } from './charts/activity-chart/activity-chart.component';
import { SourceChartComponent } from './charts/source-chart/source-chart.component';
import { LegendComponent } from './legend/legend.component';

import { CustomMaterialsModule } from '../custom-materials.module';

import { HttpService } from '../services/http.service';
import { MockHttpService } from '../services/mock-http.service';
import { LayersService } from '../services/layers.service';
import { MockLayersService } from '../services/mock-layers.service';
import { CircleService } from '../services/circle.service';
import { MockCircleService } from '../services/mock-circle.service';
import { TimeService } from '../services/time.service';
import { TableService } from '../services/table.service';


import { AdListComponent } from './ad-list/ad-list.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        FbAdsComponent,
        AdCreativeComponent,
        AdListComponent
      ],
      imports: [
        CommonModule,
        CustomMaterialsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ], providers: [
        { provide: LayersService, useClass: MockLayersService},
        { provide: HttpService, useClass: MockHttpService},
        { provide: CircleService, useClass: MockCircleService},
        TimeService,
        TableService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.ngOnInit = () => {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
