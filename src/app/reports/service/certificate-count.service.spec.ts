import { TestBed } from '@angular/core/testing';

import { CertificateCountService } from './certificate-count.service';

describe('CertificateCountService', () => {
  let service: CertificateCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
