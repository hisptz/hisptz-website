import { Component, OnInit } from '@angular/core';
import {PartnersService} from '../../../providers/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  public partners: any;
  public loading: boolean;
  public hasError: boolean;
  constructor(private partnersServices: PartnersService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.partnersServices.loadAll().subscribe((partners) => {
      this.partners = partners;
      this.loading = false;
      this.hasError = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    });
  }

}
