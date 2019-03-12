import {TestBed} from '@angular/core/testing';

import {PercentageService} from './percentage.service';

describe('PercentageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PercentageService = TestBed.get(PercentageService);
    expect(service).toBeTruthy();
  });
});
