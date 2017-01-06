import { Component, OnInit } from '@angular/core';
import {PartnerService} from "../../providers/partners.service";

@Component({
  selector: 'partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  public partners: any;
  public loading: boolean;
  public hasError: boolean;
  constructor(
      private partnerService: PartnerService
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.partnerService.loadAll().subscribe((partners) => {
      this.partners = partners;
      this.loading = false;
      this.hasError = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    });
  }

}
