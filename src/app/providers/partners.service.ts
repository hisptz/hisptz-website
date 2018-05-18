import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  public partners: Observable<any[]>;
  private _partnersPool: BehaviorSubject<any[]>;
  private baseUrl: string;
  private dataStore: {
    partners: any[]
  };

  constructor(private http: HttpClient) {
    this.baseUrl = 'assets/data/partner.json';
    this.dataStore = {partners: []};
    this._partnersPool = <BehaviorSubject<any[]>> new BehaviorSubject([]);
    this.partners = this._partnersPool;
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
            console.log('data', data)
            this.saveToPartnerPool(data);
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

  saveToPartnerPool(data: any): void {
    // Replace dataIndex with partner id
    const partnerData = [];
    data.forEach((dataItem, dataIndex) => {
      partnerData[dataItem.id] = dataItem;
    });
    this.dataStore.partners = partnerData;
    // persist apps into the pool
    this._partnersPool.next(Object.assign({}, this.dataStore).partners);
  }

  all(): Observable<any[]> {
    return this.partners;
  }

  find(id: number): Observable<any> {
    return Observable.create(observer => {
      this.partners.subscribe(partnerData => {
        if (partnerData[id]) {
          observer.next(partnerData[id]);
          observer.complete();
        } else {
          // load from source if pool has no data
          this.loadAll().subscribe(partnerData => {
            if (partnerData[id]) {
              observer.next(partnerData[id]);
              observer.complete();
            } else {
              observer.next('Partner with id "' + id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
