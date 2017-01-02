import { Component, OnInit } from '@angular/core';
import {TeamEducationService} from "../providers/team-education.service";
import {TeamEducation} from "../models/team-education";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-member-education',
  templateUrl: './member-education.component.html',
  styleUrls: ['./member-education.component.css']
})
export class MemberEducationComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  educationData: TeamEducation;
  constructor(
      private memberEducation: TeamEducationService,
      private route: ActivatedRoute
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    let member_id = this.route.snapshot.parent.params['id'];
    this.memberEducation.find(member_id).subscribe((education) => {
          this.educationData = education;
          this.loading = false;
          this.hasError = false;
        },
        error => {
          this.loading = false;
          this.hasError = true;
        });
  }

}
