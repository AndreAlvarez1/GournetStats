import { TestBed } from '@angular/core/testing';

import { ConectorService } from './conector.service';

describe('ConectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConectorService = TestBed.get(ConectorService);
    expect(service).toBeTruthy();
  });
});
