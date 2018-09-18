import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CustomMaterialsModule } from '../../custom-materials.module';

import { SliderComponent } from './slider.component';
import { RangeComponent } from './range/range.component';

import { LayersService } from '../../services/layers.service';
import { MockLayersService } from '../../services/mock-layers.service';
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.service';
import { CircleService } from '../../services/circle.service';
import { MockCircleService } from '../../services/mock-circle.service';

import { TableService } from '../../services/table.service';
import { TimeService } from '../../services/time.service';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SliderComponent,
        RangeComponent
      ],
      providers: [
        { provide: LayersService, useClass: MockLayersService},
        { provide: HttpService, useClass: MockHttpService},
        { provide: CircleService, useClass: MockCircleService},
        // TODO should be a mock router
        { provide: Router, useValue: {}},
        TimeService,
        TableService,
        RouterTestingModule,
      ],
      imports: [
        CustomMaterialsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.map = {};
    component.floodAreas = {};
    expect(component).toBeTruthy();
  });
});
