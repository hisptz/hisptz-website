/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaperService } from './paper.service';

describe('Service: Paper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaperService]
    });
  });

  it('should ...', inject([PaperService], (service: PaperService) => {
    expect(service).toBeTruthy();
  }));
});
