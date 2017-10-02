import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { MemberContactsService} from '../providers/member-contacts.service';
import {MemberContacts} from '../models/member-contacts';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-member-contacts',
  templateUrl: './member-contacts.component.html',
  styleUrls: ['./member-contacts.component.css']
})
export class MemberContactsComponent implements OnInit {

  private detailsData: any;
  loading: boolean;
  hasError: boolean;
  detailsObservable: FirebaseListObservable<any[]>;
  constructor(
    private memberContacts: MemberContactsService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth
  ) {
    this.loading = true;
    this.hasError = false;
  }
  ngOnInit() {
    this.detailsObservable = this.db.list('/members/analysts/' + this.route.snapshot.parent.params['id'] + '/details');
    this.detailsObservable.subscribe(detailsArr => {
      if (detailsArr.length > 1) {
        this.detailsData = detailsArr;
      } else {
        this.detailsObservable = this.db.list('/members/developers/' + this.route.snapshot.parent.params['id'] + '/details');
        this.detailsObservable.subscribe(newDetailsArr => {
          this.detailsData = newDetailsArr;
        });
      }
    });
  }

}
