import { Component, OnInit } from '@angular/core';
import {TeamEducationService} from '../providers/team-education.service';
import {TeamEducation} from '../models/team-education';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-member-education',
  templateUrl: './member-education.component.html',
  styleUrls: ['./member-education.component.css']
})
export class MemberEducationComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  private educationData: any;
  educationObservable: FirebaseListObservable<any[]>;
  constructor(
    private memberEducation: TeamEducationService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.educationObservable = this.db.list('/members/analysts/' + this.route.snapshot.parent.params['id'] + '/education');
    this.educationObservable.subscribe(educationArr => {
      if (educationArr.length > 1) {
        this.educationData = educationArr;
      } else {
        this.educationObservable = this.db.list('/members/developers/' + this.route.snapshot.parent.params['id'] + '/education');
        this.educationObservable.subscribe(newEducationArr => {
          this.educationData = newEducationArr;
        });
      }
    });
  }

}
