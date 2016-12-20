import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Product} from "../models/product";
import {ProductService} from "../providers/product.service";
declare var $:any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  loading: boolean;
  hasError: boolean;
  constructor(
      private route: ActivatedRoute,
      private productService: ProductService
  ) {
    this.loading = true;
    this.hasError = false;

    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        video: true,
        navText: [
          '<div class="pull-left carousel-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>',
          '<div class="pull-right carousel-arrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>'
        ],
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
      });
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let productID: string = params['id'];
      this.productService.find(productID).subscribe(product => {
        this.product = product;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.hasError = true;
      })
    });
  }

}
