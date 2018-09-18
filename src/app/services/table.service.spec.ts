import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { TableService } from './table.service';
import { MockCircleService } from './mock-circle.service';

describe('TableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        TableService,
        { provide: Router, useClass: MockCircleService},
      ],
    });
  });

  it('should be created', inject([TableService], (service: TableService) => {
    expect(service).toBeTruthy();
  }));
});
