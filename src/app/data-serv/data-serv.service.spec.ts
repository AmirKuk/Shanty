import { TestBed, inject } from '@angular/core/testing';

import { DataServService } from './data-serv.service';

describe('DataServService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataServService]
    });
  });

  it('should be created', inject([DataServService], (service: DataServService) => {
    expect(service).toBeTruthy();
  }));
});
