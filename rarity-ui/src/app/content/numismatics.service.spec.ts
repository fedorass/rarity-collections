import { TestBed, inject } from '@angular/core/testing';

import { NumismaticsService } from './numismatics.service';

describe('NumismaticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumismaticsService]
    });
  });

  it('should be created', inject([NumismaticsService], (service: NumismaticsService) => {
    expect(service).toBeTruthy();
  }));
});
