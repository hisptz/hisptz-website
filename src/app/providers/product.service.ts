import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {Product} from "../models/product";
import {Http} from "@angular/http";

@Injectable()
export class ProductService {

  public products: Observable<Product[]>;
  private _productsPool: BehaviorSubject<Product[]>;
  private baseUrl: string;
  private dataStore: {
    products: Product[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/products.json';
    this.dataStore = {products: []};
    this._productsPool = <BehaviorSubject<Product[]>> new BehaviorSubject([]);
    this.products = this._productsPool;
  }

  //Methods
  loadAll(): Observable<any> {
    //load data from the pool first
    this.all().subscribe(pool => {
      if(pool.length > 0) {
        return Observable.create(observer => {
          observer.next(pool);
          observer.complete();
        })
      }
    });

    //load data from the source if pool is empty
    return Observable.create(observer => {
      this.http.get(this.baseUrl).map(response => response.json()).subscribe(data => {
        //persist data to metadataPool
        this.saveToProductPool(data);
        //load data from the pool
        this.all().subscribe(pool => {
          observer.next(pool);
          observer.complete();
        });
      })
    })
  }

  saveToProductPool(productData: Product[]): void {
    this.dataStore.products = productData;
    //persist apps into the pool
    this._productsPool.next(Object.assign({}, this.dataStore).products);
  }

  all(): Observable<Product[]> {
    return this.products;
  }

  find(id: string): Observable<Product> {
    return Observable.create(observer => {
      this.products.subscribe(productData => {
        if(productData.length > 0) {
          productData.forEach((productItem, productIndex) => {
            if(id == productItem.id) {
              observer.next(productItem);
              observer.complete()
            }
          });
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(productData => {
            productData.forEach((productItem, productIndex) => {
              if(id == productItem.id) {
                observer.next(productItem);
                observer.complete()
              }
            });
          })
        }
      });
    });
  }
}
