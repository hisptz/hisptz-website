import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { MemberContactsService} from '../providers/member-contacts.service';
import {MemberContacts} from '../models/member-contacts';

@Component({
  selector: 'app-member-contacts',
  templateUrl: './member-contacts.component.html',
  styleUrls: ['./member-contacts.component.css']
})
export class MemberContactsComponent implements OnInit {

  detailsData: MemberContacts;
  loading: boolean;
  hasError: boolean;
  constructor(
    private memberContacts: MemberContactsService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.hasError = false;
  }
  ngOnInit() {
    const member_id = this.route.snapshot.parent.params['id'];
    this.memberContacts.find(member_id).subscribe((details) => {
        this.detailsData = details;
        this.loading = false;
        this.hasError = false;
      },
      error => {
        this.loading = false;
        this.hasError = true;
      });
  }

}
