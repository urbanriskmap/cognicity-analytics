import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAdsComponent } from './fb-ads.component';

describe('FbAdsComponent', () => {
  let component: FbAdsComponent;
  let fixture: ComponentFixture<FbAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
