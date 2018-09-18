import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

class mockClient {

  post(path, obj) {
    return Observable.of('');
  }

  get(path) {
    return Observable.of('');
  }

}

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        { provide: HttpClient, useClass: mockClient}
      ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
