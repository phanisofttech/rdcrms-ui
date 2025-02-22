import { TestBed } from '@angular/core/testing';

import { LocationFilterServiceService } from './location-filter-service.service';

describe('LocationFilterServiceService', () => {
  let service: LocationFilterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationFilterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
