import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl: string;
  private news: any;
  private _newsPool: BehaviorSubject<any[]>;
  private dataStore: {
    news: any[]
  };
  constructor(private http: HttpClient) {
    this.baseUrl = 'assets/data/news.json';
    this.dataStore = {news: []};
    this._newsPool = <BehaviorSubject<any[]>> new BehaviorSubject([]);
    this.news = this._newsPool;
  }

  // get all news method
  getAllNews(): Observable<any>  { // return the observable type of data news
    return Observable.create(observer => {
      this.allNews().subscribe(pool => {
        // check if the news have already be loaded
        if (Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(Object.keys(pool).map(key => pool[key]));
          observer.complete();
        } else {
          // get from the stored data in json file
          this.http.get(this.baseUrl).subscribe(data => {
            // save to the pool
            this.saveToNewsPool(data);
            this.allNews().subscribe(pool => {
              observer.next(Object.keys(pool).map(key => pool[key]));
              observer.complete();
            });
          });
        }
      });
    });
  }

  allNews(): Observable<any[]> {
    return this.news;
  }

  saveToNewsPool(data: any): void {
    // Replace dataIndex with partner id
    const newsData = [];
    data.forEach((dataItem, dataIndex) => {
      newsData[dataItem.id] = dataItem;
    });
    this.dataStore.news = newsData;
    // persist apps into the pool
    this._newsPool.next(Object.assign({}, this.dataStore).news);
  }

  find(id: string): Observable<any> {
    return Observable.create(observer => {
      this.news.subscribe(newsData => {
        if (newsData[id]) {
          observer.next(newsData[id]);
          observer.complete();
        } else {
          // load from source if pool has no data
          this.getAllNews().subscribe(newsData => {
            if (newsData[id]) {
              observer.next(newsData[id]);
              observer.complete();
            } else {
              observer.next('News with id "' + id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
