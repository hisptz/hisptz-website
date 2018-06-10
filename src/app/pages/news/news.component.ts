import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../providers/news.service';
import {ActivatedRoute, Params} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news: any;
  public allNews: any;
  loading: boolean;
  hasError: boolean;
  constructor(private newsService: NewsService, private route: ActivatedRoute) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const newsId: string = params['id'];
      this.newsService.find(newsId).subscribe(data => {
        this.news = data;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.hasError = true;
      });
    });

    this.newsService.getAllNews().subscribe(data => {
      this.allNews = data;
    });

    $.fn.liScroll = function(settings) {
      settings = $.extend({
        travelocity: 0.03
      }, settings);
      return this.each(function() {
        const $strip = $(this);
        $strip.addClass('newsticker')
        let stripHeight = 1;
        $strip.find('li').each(function(i) {
          stripHeight += $(this, i).outerHeight(true); // thanks to Michael Haszprunar and Fabien Volpi
        });
        const $mask = $strip.wrap('<div class=' + '"mask"' + '></div>');
        const $tickercontainer = $strip.parent().wrap('<div class=' + '"tickercontainer"' + '></div>');
        const containerHeight = $strip.parent().parent().height();
        $strip.height(stripHeight);
        const totalTravel = stripHeight;
        const defTiming = totalTravel / settings.travelocity;
        function scrollnews(spazio, tempo) {
          $strip.animate({top: '-=' + spazio}, tempo, 'linear', function() {$strip.css('top', containerHeight); scrollnews(totalTravel, defTiming);});
        }
        scrollnews(totalTravel, defTiming);
        $strip.hover(function() {
            $(this).stop();
          },
          function() {
            const offset = $(this).offset();
            const residualSpace = offset.top + stripHeight;
            const residualTime = residualSpace / settings.travelocity;
            scrollnews(residualSpace, residualTime);
          });
      });
    };

    $(function() {
      $('ul#ticker01').liScroll();
    });
  }

}

