import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../providers/article.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Article} from '../models/article';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  public loading: boolean;
  public hasError: boolean;
  public article: Article;
  public moreArticles: Article[];
  articles: FirebaseObjectObservable<any[]>;
  page: FirebaseObjectObservable<any[]>;
  name: string;
  public theArticleContent: any;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private db: AngularFireDatabase
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   const articleId = params['id'];
    //   const moreArticles = [];
    //   this.articleService.loadAll().subscribe(articles => {
    //     console.log(articles);
    //     articles.forEach(article => {
    //       if (article.id == articleId) {
    //         this.article = article;
    //         console.log(article);
    //       } else {
    //         moreArticles.push(article);
    //       }
    //     });
    //     this.moreArticles =  moreArticles;
    //     this.loading = false;
    //   }, error => {
    //     this.loading = false;
    //     this.hasError =  true;
    //   });
    // });

    this.route.params.subscribe(params => {
      const articleId = params['id'];
      // -L3E-5hMBfhmG12H9gSz/content
      this.articles = this.db.object('/articlesPages/');
      this.articles.subscribe(article => {
        console.log(article);
        // Object.keys(article).forEach((thePageKey) => {
        //   if (article[thePageKey].id === articleId) {
        //     this.page = this.db.object('/articlesPages/' + thePageKey);
        //     this.page.subscribe(thePage => {
        //       this.theArticleContent = this.sanitizer.bypassSecurityTrustHtml(thePage['content']);
        //       console.log(this.theArticleContent);
        //     });
        //   }
        // });
      });
    });
  }

}
