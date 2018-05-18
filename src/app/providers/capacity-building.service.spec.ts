import { TestBed, inject } from '@angular/core/testing';

import { CapacityBuildingService } from './capacity-building.service';

describe('CapacityBuildingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapacityBuildingService]
    });
  });

  it('should be created', inject([CapacityBuildingService], (service: CapacityBuildingService) => {
    expect(service).toBeTruthy();
  }));
});
