import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ServicesService} from '../../../providers/services.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  public service: any;
  loading: boolean;
  hasError: boolean;
  constructor(private servicesService: ServicesService, private route: ActivatedRoute) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const serviceId: string = params['id'];
      this.servicesService.find(serviceId).subscribe(service => {
        this.service = service;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.hasError = true;
      });
    });
  }

}
