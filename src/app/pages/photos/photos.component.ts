import { Component, OnInit } from '@angular/core';
import {PhotosService} from '../../providers/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public photos: any;
  loading: boolean;
  hasError: boolean;
  constructor(private photosService: PhotosService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.photosService.loadAll().subscribe((photos) => {
        this.photos = photos;
        this.loading = false;
        this.hasError = false;
      },
      error => {
        this.loading = false;
        this.hasError = true;
      });
  }

}
