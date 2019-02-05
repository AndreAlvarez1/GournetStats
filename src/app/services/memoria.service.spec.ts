import { TestBed } from '@angular/core/testing';

import { MemoriaService } from './memoria.service';

describe('MemoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoriaService = TestBed.get(MemoriaService);
    expect(service).toBeTruthy();
  });
});
