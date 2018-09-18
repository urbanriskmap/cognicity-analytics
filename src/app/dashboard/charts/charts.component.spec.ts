import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { DashboardModule } from '../dashboard.module';
import { ActivityChartComponent } from './activity-chart/activity-chart.component';
import { SourceChartComponent } from './source-chart/source-chart.component';
import { ChartsComponent } from './charts.component';
import { FbAdsComponent } from '../fb-ads/fb-ads.component';
import { AdCreativeComponent } from '../fb-ads/ad-creative/ad-creative.component';
import { TimeService } from '../../services/time.service';
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.service';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChartsComponent,
        ActivityChartComponent,
        SourceChartComponent,
        FbAdsComponent,
        AdCreativeComponent
      ],
      providers: [
        TranslateService,
        TimeService,
        {provide: HttpService, useClass: MockHttpService},
      ],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
