import { TestBed } from '@angular/core/testing';

import { BirthServiceService } from './birth-service.service';

describe('BirthServiceService', () => {
  let service: BirthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
