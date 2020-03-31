import { TestBed } from '@angular/core/testing';

import { Covid19DataService } from './covid19-data.service';

describe('Covid19DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Covid19DataService = TestBed.get(Covid19DataService);
    expect(service).toBeTruthy();
  });
});
