import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslatePipe, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from '../services/table.service';
import { MockCircleService } from '../services/mock-circle.service';
import { TimeService } from '../services/time.service';

import { Observable } from 'rxjs';

import { ReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      providers: [ 
        TranslateService,
        TableService,
        TimeService,
        { provide: Router, useClass: MockCircleService},
        {
            provide: ActivatedRoute,
            useValue: {
              params: Observable.of({id: 123}),
              queryParams: Observable.of(
                {updated: 'N/A'}
              )
            }
        },
      ],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
