import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Service} from '../shared/models/services';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  public photos: Observable<Service[]>;
  private _photosPool: any;
  private baseUrl: string;
  private dataStore: {
    photos: Service[]
  };
  constructor(private http: HttpClient) {
    this.baseUrl = 'assets/data/photos.json';
    this.dataStore = {photos: []};
    this._photosPool = <BehaviorSubject<Service[]>> new BehaviorSubject([]);
    this.photos = this._photosPool;
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
    const photoData = [];
    data.forEach((dataItem, dataIndex) => {
      photoData[dataItem.id] = dataItem;
    });
    this.dataStore.photos = photoData;
    // persist apps into the pool
    this._photosPool.next(Object.assign({}, this.dataStore).photos);
  }

  all(): Observable<Service[]> {
    return this.photos;
  }

  find(id: string): Observable<any> {
    return Observable.create(observer => {
      this.photos.subscribe(photoData => {
        if (photoData[id]) {
          observer.next(photoData[id]);
          observer.complete();
        } else {
          // load from source if pool has no data
          this.loadAll().subscribe(photoData => {
            if (photoData[id]) {
              observer.next(photoData[id]);
              observer.complete();
            } else {
              observer.next('Photo with id "' + id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
