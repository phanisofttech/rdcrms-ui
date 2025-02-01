import { TestBed } from '@angular/core/testing';

import { ChangePasswordServiceService } from './change-password-service.service';

describe('ChangePasswordServiceService', () => {
  let service: ChangePasswordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
