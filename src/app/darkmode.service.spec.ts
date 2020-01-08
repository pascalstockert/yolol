import { TestBed } from '@angular/core/testing';

import { DarkmodeService } from './darkmode.service';

describe('DarkmodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DarkmodeService = TestBed.get(DarkmodeService);
    expect(service).toBeTruthy();
  });
});
