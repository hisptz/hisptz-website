import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';
import {Service} from '../shared/models/services';

@Injectable()
export class ServicesService {

  public services: Observable<Service[]>;
  private _projectsPool: BehaviorSubject<Service[]>;
  private baseUrl: string;
  private dataStore: {
    services: Service[]
  };

  constructor(private http: HttpClient) {
    this.baseUrl = 'assets/data/services.json';
    this.dataStore = {services: []};
    this._projectsPool = <BehaviorSubject<Service[]>> new BehaviorSubject([]);
    this.services = this._projectsPool;
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
            this.saveToProjectPool(data);
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

  saveToProjectPool(data: any): void {
    // Replace dataIndex with project id
    const serviceData = [];
    data.forEach((dataItem, dataIndex) => {
      serviceData[dataItem.id] = dataItem;
    });
    this.dataStore.services = serviceData;
    // persist apps into the pool
    this._projectsPool.next(Object.assign({}, this.dataStore).services);
  }

  all(): Observable<Service[]> {
    return this.services;
  }

  find(id: string): Observable<Service> {
    return Observable.create(observer => {
      this.services.subscribe(serviceData => {
        if (serviceData[id]) {
          observer.next(serviceData[id]);
          observer.complete();
        } else {
          // load from source if pool has no data
          this.loadAll().subscribe(serviceData => {
            if (serviceData[id]) {
              observer.next(serviceData[id]);
              observer.complete();
            } else {
              observer.next('Service with id "' + id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
