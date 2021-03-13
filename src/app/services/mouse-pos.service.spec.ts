import { TestBed } from '@angular/core/testing';

import { MousePosService } from './mouse-pos.service';

describe('MousePosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MousePosService = TestBed.get(MousePosService);
    expect(service).toBeTruthy();
  });
});
