import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AdListComponent } from './ad-list.component';
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.service';
import { CircleService } from '../../services/circle.service';
import { MockCircleService } from '../../services/mock-circle.service';

describe('AdListComponent', () => {
  let component: AdListComponent;
  let fixture: ComponentFixture<AdListComponent>;
  let firstSubmitBut: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdListComponent ],
      providers: [{ provide: CircleService, useClass: MockCircleService },
        {provide: HttpService, useClass: MockHttpService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //should only be one submit element on the page
    firstSubmitBut = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mock ad present', () => {
    // the mock circle service has a singular ad
    // that it uses to respond to getAds
    expect(component.ads[0]).toBeTruthy();
  });

  it('mock ad has submit button', () => {
    // the mock circle service has a singular ad
    // that it uses to respond to getAds
    expect(firstSubmitBut).toBeTruthy();
    expect(firstSubmitBut.nativeElement.textContent).toEqual('Submit For Approval');
  });

});
