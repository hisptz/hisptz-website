/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamConsultancyService } from './team-consultancy.service';

describe('Service: TeamConsultancy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamConsultancyService]
    });
  });

  it('should ...', inject([TeamConsultancyService], (service: TeamConsultancyService) => {
    expect(service).toBeTruthy();
  }));
});
