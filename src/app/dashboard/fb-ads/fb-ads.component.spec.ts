import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.service';

import { AdCreativeComponent } from './ad-creative/ad-creative.component';
import { FbAdsComponent } from './fb-ads.component';

import { CircleService } from '../../services/circle.service';
import { MockCircleService } from '../../services/mock-circle.service';

describe('FbAdsComponent', () => {
  let component: FbAdsComponent;
  let fixture: ComponentFixture<FbAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FbAdsComponent,
        AdCreativeComponent
      ],
      providers: [
        { provide: HttpService, useClass: MockHttpService},
        { provide: CircleService, useClass: MockCircleService},
      ]
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

  it('should have first element populated',
    async(() => {
      // ngOnInit
      fixture.detectChanges();
      // wait for the task queue to be empty
      // this means that the getAllAdCreatives call to mock-http has finished
      fixture.whenStable().then(() => {

        // wait for the mock http response
        // this makes all promises complete before going forward
        fixture.detectChanges();
        // first element should be populated
        expect(component).toBeTruthy();
        expect(component.adCreatives[0]).toBeTruthy();
        let firstId= component.adCreatives[0].id;

        let firstAdContainer = fixture.debugElement.query(By.css('.adContainer'));
        let viewFirstId = fixture.debugElement.query(By.css('.adContainer')).children[0].attributes['ng-reflect-id'];
        console.log(typeof(viewFirstId))
        console.log(typeof(firstId))
        expect( viewFirstId ).toEqual( firstId.toString());
        expect( 'hello').toEqual('hello');
      });
    }));
});
