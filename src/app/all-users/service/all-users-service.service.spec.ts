import { TestBed } from '@angular/core/testing';

import { AllUsersServiceService } from './all-users-service.service';

describe('AllUsersServiceService', () => {
  let service: AllUsersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllUsersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
