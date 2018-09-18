import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HttpService } from '../../../services/http.service';
import { MockHttpService } from '../../../services/mock-http.service';

import { CircleService } from '../../../services/circle.service';
import { MockCircleService } from '../../../services/mock-circle.service';

import { AdCreativeComponent } from './ad-creative.component';

describe('AdCreativeComponent', () => {
  let component: AdCreativeComponent;
  let fixture: ComponentFixture<AdCreativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCreativeComponent ],
      providers: [
        { provide: HttpService, useClass: MockHttpService},
        { provide: CircleService, useClass: MockCircleService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCreativeComponent);
    component = fixture.componentInstance;
    component.id = 1234;
    component.message = 'test message';
    component.link = '';
    component.image_url = '';
    component.ngOnInit = () => {return };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have test message', () => {
    let mes = fixture.debugElement.query(By.css('#messageContainer'));
    // use contain because there'll be new lines due to html...
    expect(mes.nativeElement.textContent).toContain(component.message);
    expect(component).toBeTruthy();
  });

  it('should be able to click select', () => {

    let button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    //expect(mes.nativeElement.textContent).toContain(component.message);
    expect(component).toBeTruthy();

    let mockCirService = TestBed.get(CircleService);
    fixture.detectChanges();
    console.log(mockCirService);
    expect(mockCirService.ads[0].adCreativeId).toBe(1234);
  });

});
