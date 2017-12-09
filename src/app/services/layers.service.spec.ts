import { TestBed, inject } from '@angular/core/testing';

import { LayersService } from './layers.service';

describe('LayersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayersService]
    });
  });

  it('should be created', inject([LayersService], (service: LayersService) => {
    expect(service).toBeTruthy();
  }));
});
