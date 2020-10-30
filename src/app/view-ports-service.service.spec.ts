import { TestBed } from '@angular/core/testing';

import { ViewPortsServiceService } from './view-ports-service.service';

describe('ViewPortsServiceService', () => {
  let service: ViewPortsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPortsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
