import { Component, OnInit } from '@angular/core';
import {TeamConsultancy} from '../models/team-consultancy';
import {TeamConsultancyService} from '../providers/team-consultancy.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-member-consultancy',
  templateUrl: './member-consultancy.component.html',
  styleUrls: ['./member-consultancy.component.css']
})
export class MemberConsultancyComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  consultancyData: TeamConsultancy;
  constructor(
    private memberConsultancy: TeamConsultancyService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    const member_id = this.route.snapshot.parent.params['id'];
    this.memberConsultancy.find(member_id).subscribe((consultancy) => {
        this.consultancyData = consultancy;
        this.loading = false;
        this.hasError = false;
      },
      error => {
        this.loading = false;
        this.hasError = true;
      });
  }

}
