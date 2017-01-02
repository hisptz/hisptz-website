import { Component, OnInit } from '@angular/core';
import {TeamExperience} from "../models/team-experience";
import {TeamExperienceService} from "../providers/team-experience.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-member-experience',
  templateUrl: './member-experience.component.html',
  styleUrls: ['./member-experience.component.css']
})
export class MemberExperienceComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  experienceData: TeamExperience;
  constructor(
      private memberExperience: TeamExperienceService,
      private route: ActivatedRoute
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
      let member_id = this.route.snapshot.parent.params['id'];
      this.memberExperience.find(member_id).subscribe((experience) => {
              this.experienceData = experience;
              this.loading = false;
              this.hasError = false;
          },
          error => {
              this.loading = false;
              this.hasError = true;
          });
  }

}
