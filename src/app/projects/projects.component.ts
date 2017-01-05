import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../providers/projects.service";
import {Project} from "../models/project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public loading: boolean;
  public hasError: boolean;
  constructor(private projectService: ProjectService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.projectService.loadAll().subscribe((projects) => {
          this.projects = projects;
          this.loading = false;
          this.hasError = false;
        },
        error => {
          this.loading = false;
          this.hasError = true;
        })
  }

}
