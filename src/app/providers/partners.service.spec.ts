/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartnersService } from './partners.service';

describe('Service: Partners', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnersService]
    });
  });

  it('should ...', inject([PartnersService], (service: PartnersService) => {
    expect(service).toBeTruthy();
  }));
});
