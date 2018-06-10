import { Component, OnInit } from '@angular/core';
import {CapacityBuildingService} from '../../providers/capacity-building.service';
import {CapacityBuilding} from '../../shared/models/capacity_building';

@Component({
  selector: 'app-capacity-building',
  templateUrl: './capacity-building.component.html',
  styleUrls: ['./capacity-building.component.css']
})
export class CapacityBuildingComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  public capacityBuilding: CapacityBuilding[];
  constructor(private capacityBuildingService: CapacityBuildingService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.capacityBuildingService.loadAll().subscribe(capacityBuilding => {
      this.capacityBuilding = capacityBuilding;
      console.log(this.capacityBuilding)
      this.loading = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    });
  }

}

