import { Injectable } from '@angular/core';
import {CapacityBuilding} from '../shared/models/capacity_building';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class CapacityBuildingService {

  loading: boolean;
  hasError: boolean;
  public capacityBuilding: Observable<CapacityBuilding[]>;
  private _capacityBuildingPool: BehaviorSubject<CapacityBuilding[]>;
  private baseUrl: string;
  private dataStore: {
    capacityBuilding: CapacityBuilding[]
  };
  constructor(private http: HttpClient) {
    this.baseUrl = 'assets/data/capacity_building.json';
    this.dataStore = {capacityBuilding: []};
    this._capacityBuildingPool = <BehaviorSubject<CapacityBuilding[]>> new BehaviorSubject([]);
    this.capacityBuilding = this._capacityBuildingPool;
  }

  // Methods
  loadAll(): Observable<any> {
    return Observable.create(observer => {
      // load data from the pool first
      this.all().subscribe(pool => {
        if (Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(Object.keys(pool).map(key => pool[key]));
          observer.complete();
        } else {
          // load data from the source if pool is empty
          this.http.get(this.baseUrl).subscribe(data => {
            // persist data to metadataPool
            this.saveToTrainingPool(data);
            // load data from the pool
            this.all().subscribe(pool => {
              observer.next(Object.keys(pool).map(key => pool[key]));
              observer.complete();
            });
          });
        }
      });
    });
  }

  saveToTrainingPool(data: any): void {
    // Replace dataIndex with training id
    const capacityBuildingData = [];
    data.forEach((dataItem, dataIndex) => {
      capacityBuildingData[dataItem.id] = dataItem;
    });
    this.dataStore.capacityBuilding = capacityBuildingData;
    // persist apps into the pool
    this._capacityBuildingPool.next(Object.assign({}, this.dataStore).capacityBuilding);
  }

  all(): Observable<CapacityBuilding[]> {
    return this.capacityBuilding;
  }

  find(id: number): Observable<CapacityBuilding> {
    return Observable.create(observer => {
      this.capacityBuilding.subscribe(capacityBuildingData => {
        if (capacityBuildingData[id]) {
          observer.next(capacityBuildingData[id]);
          observer.complete();
        } else {
          // load from source if pool has no data
          this.loadAll().subscribe(capacityBuildingData => {
            if (capacityBuildingData[id]) {
              observer.next(capacityBuildingData[id]);
              observer.complete();
            } else {
              observer.next('capacity Building Data with id "' + id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
