import { Component, OnInit } from '@angular/core';
import {TeamExperience} from '../models/team-experience';
import {TeamExperienceService} from '../providers/team-experience.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-member-experience',
  templateUrl: './member-experience.component.html',
  styleUrls: ['./member-experience.component.css']
})
export class MemberExperienceComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  private  experienceData: any;
  experienceObservable: FirebaseListObservable<any[]>;
  constructor(
    private memberExperience: TeamExperienceService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.experienceObservable = this.db.list('/members/analysts/' + this.route.snapshot.parent.params['id'] + '/experience');
    this.experienceObservable.subscribe(experienceArr => {
      if (experienceArr.length > 1) {
        this.experienceData = experienceArr;
      } else {
        this.experienceObservable = this.db.list('/members/developers/' + this.route.snapshot.parent.params['id'] + '/experience');
        this.experienceObservable.subscribe(newExperienceArr => {
          this.experienceData = newExperienceArr;
        });
      }
    });
  }

}
