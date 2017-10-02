import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TeamService} from '../providers/team.service';
import {Team} from '../models/team';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {

  private member: any;
  public memberId: any;
  private memberName: any;
  private memberBio: any;
  private skills: any;
  public img_url: any;
  private memberTitle: any;
  private linkedin_url: any;
  // private skills: any;
  private memberObj: {};
  loading: boolean;
  hasError: boolean;
  memberObservable: FirebaseListObservable<any[]>;
  skillsObservable: FirebaseListObservable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private memberService: TeamService,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const memberID = params['id'];
      this.skillsObservable = this.db.list('/members/analysts/' + memberID + '/skills');
      this.skillsObservable.subscribe( memberSkills => {
        if (memberSkills.length > 0) {
          this.skills = memberSkills;
        } else {
          this.skillsObservable = this.db.list('/members/developers/' + memberID + '/skills');
          this.skillsObservable.subscribe( newMemberSkills => {
            if (newMemberSkills.length > 0) {
              this.skills = newMemberSkills;
            }
          });
        }
      });
      this.memberObservable = this.db.list('/members/analysts/' + memberID + '/');
      this.memberObservable.subscribe(memberArr => {
        if (memberArr.length > 0) {
          memberArr.forEach( val => {
            if (val.$key === 'bio') {
              this.memberBio = val.$value;
            } else if (val.$key === 'id') {
              this.memberId = val.$value;
            } else if (val.$key === 'img_url') {
              this.img_url = val.$value;
            } else if (val.$key === 'position') {
              this.memberTitle = val.$value;
            }else if (val.$key === 'linkedin_url') {
              this.linkedin_url = val.$value;
            }
          });
        } else {
          this.memberObservable = this.db.list('/members/developers/' + memberID);
          this.memberObservable.subscribe(newMemberArr => {
            newMemberArr.forEach( val => {
              if (val.$key === 'bio') {
                this.memberBio = val.$value;
              } else if (val.$key === 'id') {
                this.memberId = val.$value;
              } else if (val.$key === 'img_url') {
                this.img_url = val.$value;
              } else if (val.$key === 'position') {
                this.memberTitle = val.$value;
              }else if (val.$key === 'linkedin_url') {
                this.linkedin_url = val.$value;
              }
            });
          });
        }
      });
    });
  }

}

