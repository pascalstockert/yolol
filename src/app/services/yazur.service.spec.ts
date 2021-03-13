import { TestBed } from '@angular/core/testing';

import { YazurService } from './yazur.service';

describe('YazurService', () => {
  let service: YazurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YazurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
