import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partners: any;
  template: string;
  constructor() { }

  ngOnInit() {
    this.partners = [
      {name: "oslo",logo:"assets/img/partners/oslo.png",url:""},
      {name: "chai",logo:"assets/img/partners/chai-logo.svg",url:""},
      {name: "moh",logo:"assets/img/partners/moh.png",url:""},
      {name: "oslo",logo:"assets/img/partners/jhpiego-logo.png",url:""},
      {name: "oslo",logo:"assets/img/partners/chai-logo.svg",url:""},
      {name: "oslo",logo:"assets/img/partners/moh.png",url:""},
    ]
    //create dom to prevent carousel to start without template
    let domTemplate: string = '';
    this.partners.forEach((item, key) => {
       domTemplate += this.partnerCard(item);
    })
    $('#partner-carousel').html(domTemplate);

    $('#partner-carousel').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      responsive:{
        0:{
          items:2,
          nav:false,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        },
        600:{
          items:4,
          nav:false,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        },
        1000:{
          items:11,
          nav:false,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        }
      }
    })
  }

  partnerCard(data): string {

    return '<div style="text-align: center; height: 90px;"><a href=""><img height="100%" width="100%" src="'+ data.logo +'"></a></div>'

  }

}
