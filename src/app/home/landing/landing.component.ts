import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.landing-carousel').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      responsive:{
        0:{
          items:1,
          nav:false,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        },
        600:{
          items:1,
          nav:false,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        },
        1000:{
          items:1,
          nav:false,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        }
      }
    })
  }

}
