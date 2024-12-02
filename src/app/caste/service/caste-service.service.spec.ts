import { TestBed } from '@angular/core/testing';

import { CasteServiceService } from './caste-service.service';

describe('CasteServiceService', () => {
  let service: CasteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});