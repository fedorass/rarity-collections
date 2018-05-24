import { TestBed, inject } from '@angular/core/testing';

import { MonetaryPeriodService } from './monetary-period.service';

describe('MonetaryPeriodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonetaryPeriodService]
    });
  });

  it('should be created', inject([MonetaryPeriodService], (service: MonetaryPeriodService) => {
    expect(service).toBeTruthy();
  }));
});
