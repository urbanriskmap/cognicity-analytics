import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdListComponent } from './ad-list.component';
import { CircleService } from '../../services/circle.service';

class MockCircle {
  constructor () {}
  getAds() {
    let mockCircle = {
      getCenter: () => {
        return {lat: 0, lng: 90};
      },
      getRadius: () => {
        return 2000;
      }
    }
    let mockAd = {
      circle: mockCircle,
      adCreativeId: 12345
    };
    return [mockAd];
  }
}

describe('AdListComponent', () => {
  let component: AdListComponent;
  let circleService: CircleService;
  let fixture: ComponentFixture<AdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdListComponent ],
      providers: [{ provide: CircleService, useClass: MockCircle }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdListComponent);
    component = fixture.componentInstance;
    circleService = TestBed.get(CircleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('one ad', () => {
    // component.ads
    console.log(circleService);
    expect(true).toBeTruthy();
  });

  it('component shows mock ad', () => {

  });
});
