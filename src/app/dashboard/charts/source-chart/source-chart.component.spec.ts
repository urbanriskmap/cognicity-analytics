import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceChartComponent } from './source-chart.component';

describe('SourceChartComponent', () => {
  let component: SourceChartComponent;
  let fixture: ComponentFixture<SourceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
