import { Component, OnInit } from '@angular/core';
import {TeamService} from "../providers/team.service";
import {Team} from "../models/team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team[];
  loading: boolean;
  hasError: boolean;
  constructor(private teamService: TeamService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.teamService.loadAll().subscribe(team => {
      this.team = Object.keys(team).map(key => team[key]);
      this.loading = false;
      this.hasError = false;
    }, error => {
      console.log(error)
      this.loading = false;
      this.hasError = true;
    })
  }

}
