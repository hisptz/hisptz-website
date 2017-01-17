import { Component, OnInit } from '@angular/core';
import {TeamService} from "../providers/team.service";
import {Team} from "../models/team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  analysts: Array<any>;
  developers:  Array<any>;
  constructor(private teamService: TeamService) {
    this.loading = true;
    this.hasError = false;
    this.analysts = [];
    this.developers = [];
  }

  ngOnInit() {
    this.teamService.loadAll().subscribe(team => {
      team.forEach((teamValue) => {
        if (teamValue.level == 1) {
          this.analysts.push(teamValue);
        } else {
          this.developers.push(teamValue);
        }
      })
      this.loading = false;
      this.hasError = false;
    }, error => {
      console.log(error)
      this.loading = false;
      this.hasError = true;
    })
  }

}
