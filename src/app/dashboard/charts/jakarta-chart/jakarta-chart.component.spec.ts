import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JakartaChartComponent } from './jakarta-chart.component';

describe('JakartaChartComponent', () => {
  let component: JakartaChartComponent;
  let fixture: ComponentFixture<JakartaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JakartaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JakartaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
