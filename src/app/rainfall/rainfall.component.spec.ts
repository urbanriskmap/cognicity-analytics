import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RainfallComponent } from './rainfall.component';

describe('RainfallComponent', () => {
  let component: RainfallComponent;
  let fixture: ComponentFixture<RainfallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RainfallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RainfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
