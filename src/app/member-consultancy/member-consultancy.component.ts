import { Component, OnInit } from '@angular/core';
import {TeamConsultancy} from '../models/team-consultancy';
import {TeamConsultancyService} from '../providers/team-consultancy.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-member-consultancy',
  templateUrl: './member-consultancy.component.html',
  styleUrls: ['./member-consultancy.component.css']
})
export class MemberConsultancyComponent implements OnInit {

  loading: boolean;
  hasError: boolean;
  public consultancyData: any;
  consultancyObservable: FirebaseListObservable<any[]>;
  constructor(
    private memberConsultancy: TeamConsultancyService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.consultancyObservable = this.db.list('/members/analysts/' + this.route.snapshot.parent.params['id'] + '/consultancy');
    this.consultancyObservable.subscribe(consultancyArr => {
      if (consultancyArr.length > 1) {
        this.consultancyData = consultancyArr;
      } else {
        this.consultancyObservable = this.db.list('/members/developers/' + this.route.snapshot.parent.params['id'] + '/consultancy');
        this.consultancyObservable.subscribe(newConsultancyArr => {
          this.consultancyData = newConsultancyArr;
        });
      }
    });
  }

}
