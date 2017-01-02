/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamEducationService } from './team-education.service';

describe('Service: TeamEducation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamEducationService]
    });
  });

  it('should ...', inject([TeamEducationService], (service: TeamEducationService) => {
    expect(service).toBeTruthy();
  }));
});
