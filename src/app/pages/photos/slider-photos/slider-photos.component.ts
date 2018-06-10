import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider-photos',
  templateUrl: './slider-photos.component.html',
  styleUrls: ['./slider-photos.component.css']
})
export class SliderPhotosComponent implements OnInit {

  @Input() sliderPhotos: any;
  constructor() { }

  ngOnInit() {
  }

}
