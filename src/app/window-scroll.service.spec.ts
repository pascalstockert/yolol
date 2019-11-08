import { TestBed } from '@angular/core/testing';

import { WindowScrollService } from './window-scroll.service';

describe('WindowScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowScrollService = TestBed.get(WindowScrollService);
    expect(service).toBeTruthy();
  });
});
