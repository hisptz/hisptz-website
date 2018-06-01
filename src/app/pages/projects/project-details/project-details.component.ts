import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectsService} from '../../../providers/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public project: any;
  public projects: any;
  loading: boolean;
  hasError: boolean;
  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const projectId: string = params['id'];
      this.projectsService.find(projectId).subscribe(project => {
        this.project = project;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.hasError = true;
      });
    });

    this.projectsService.loadAll().subscribe((projects) => {
        this.projects = projects;
        this.loading = false;
        this.hasError = false;
      },
      error => {
        this.loading = false;
        this.hasError = true;
      });
  }

}
