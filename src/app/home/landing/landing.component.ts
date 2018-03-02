import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.landing-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      navText: [""],
      dots: true,
      dotsContainer: '#carousel-custom-dots',
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          loop: true,
          autoplay: true,
          autoplaySpeed: 2000
        },
        600: {
          items: 1,
          loop: true,
          autoplay: true,
          autoplaySpeed: 2000
        },
        1000: {
          items: 1,
          loop: true,
          autoplay: true,
          autoplaySpeed: 2000
        }
      }
    });
    $('.owl-dot').click(function () {
      $('.landing-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    // $('.owl-prev').css('position', 'absolute');
    // $('.owl-next').css('position', 'absolute');
    // $('.owl-prev').css('height', '45px');
    // $('.owl-next').css('height', '45px');
    // $('.owl-prev').css('width', '25px');
    // $('.owl-next').css('width', '25px');
    // $('.owl-prev').css('top', '45%');
    // $('.owl-next').css('top', '45%');

    // $('.owl-prev').css('borderBottomRightRadius', '40px');
    // $('.owl-prev').css('borderTopRightRadius', '40px');
    // $('.owl-next').css('borderBottomLeftRadius', '50px');
    // $('.owl-next').css('borderTopLeftRadius', '50px');

    // $('.owl-next').css('right', '5px');
    // $('.owl-prev').css('marginLeft', '5px');
    // $('.owl-prev').css('backgroundColor', '#F5F5F5');
    // $('.owl-next').css('backgroundColor', '#F5F5F5');
  }

}
