import { TestBed, inject } from '@angular/core/testing';

import { MouvementService } from './mouvement.service';

describe('MouvementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MouvementService]
    });
  });

  it('should be created', inject([MouvementService], (service: MouvementService) => {
    expect(service).toBeTruthy();
  }));
});
