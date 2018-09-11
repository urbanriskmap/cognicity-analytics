import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCreativeComponent } from './ad-creative.component';

describe('AdCreativeComponent', () => {
  let component: AdCreativeComponent;
  let fixture: ComponentFixture<AdCreativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCreativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
