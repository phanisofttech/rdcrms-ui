import { TestBed } from '@angular/core/testing';

import { IncomeServiceService } from './income-service.service';

describe('IncomeServiceService', () => {
  let service: IncomeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
