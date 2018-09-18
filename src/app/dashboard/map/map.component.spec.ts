import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersService } from '../../services/layers.service';
import { MockLayersService } from '../../services/mock-layers.service';
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.service';
import { CircleService } from '../../services/circle.service';
import { MockCircleService } from '../../services/mock-circle.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [{ provide: LayersService, useClass: MockLayersService},
        { provide: HttpService, useClass: MockHttpService},
        { provide: CircleService, useClass: MockCircleService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
