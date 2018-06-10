import { Component, OnInit } from '@angular/core';
import {Service} from '../../shared/models/services';
import {ServicesService} from '../../providers/services.service';

@Component({
  selector: 'app-hisptz-services',
  templateUrl: './hisptz-services.component.html',
  styleUrls: ['./hisptz-services.component.css']
})
export class HisptzServicesComponent implements OnInit {


  public services: Service[];
  public loading: boolean;
  public hasError: boolean;
  constructor(private servicesService: ServicesService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.servicesService.loadAll().subscribe((services) => {
        this.services = services;
        this.loading = false;
        this.hasError = false;
      },
      error => {
        this.loading = false;
        this.hasError = true;
      });
  }

}
