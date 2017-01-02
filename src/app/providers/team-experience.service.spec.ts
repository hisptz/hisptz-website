/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamExperienceService } from './team-experience.service';

describe('Service: TeamExperience', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamExperienceService]
    });
  });

  it('should ...', inject([TeamExperienceService], (service: TeamExperienceService) => {
    expect(service).toBeTruthy();
  }));
});
