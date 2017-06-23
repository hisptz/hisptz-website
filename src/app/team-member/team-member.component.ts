import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TeamService} from '../providers/team.service';
import {Team} from '../models/team';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {

  member: Team;
  loading: boolean;
  hasError: boolean;
  constructor(
    private route: ActivatedRoute,
    private memberService: TeamService
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const memberID = params['id'];
      this.memberService.find(memberID).subscribe(member => {
        this.member = member;
        console.log(member);
        this.loading = false;
        this.hasError = false;
      }, error => {
        this.loading = false;
        this.hasError = true;
      });

    });
  }

}
