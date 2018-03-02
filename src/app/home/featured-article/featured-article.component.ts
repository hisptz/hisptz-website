import { Component, OnInit } from '@angular/core';
import {Article} from '../../models/article';
import {ArticleService} from '../../providers/article.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.css']
})
export class FeaturedArticleComponent implements OnInit {

  public article: Article;
  public loading: boolean;
  public hasError: boolean;
  public articleName: any;
  articles: FirebaseObjectObservable<any[]>;
  page: FirebaseObjectObservable<any[]>;
  name: string;
  public theArticleContent: any;
  constructor(
    private articleService: ArticleService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private db: AngularFireDatabase
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    const articleId = 'ab9w9mv07r7';
    this.articles = this.db.object('/articlesPages/');
    this.articles.subscribe(thePage => {
      console.log(this.articles);
      console.log(thePage);
      this.theArticleContent = this.sanitizer.bypassSecurityTrustHtml(thePage['content']);
    });
    // this.articles.subscribe(article => {
    //   console.log(article);
    //   Object.keys(article).forEach((thePageKey) => {
    //     if (article[thePageKey].id === articleId) {
    //       this.page = this.db.object('/articlesPages/' + thePageKey);
    //       this.page.subscribe(thePage => {
    //         this.theArticleContent = this.sanitizer.bypassSecurityTrustHtml(thePage['content']);
    //       });
    //     }
    //   });
    // });
  }

}
