import { TestBed } from '@angular/core/testing';

import { PrismicService } from './prismic.service';

describe('PrismicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrismicService = TestBed.get(PrismicService);
    expect(service).toBeTruthy();
  });
});
