import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private homeid: string;
  constructor(private router: Router) {
    this.homeid = 'home';
  }

  ngOnInit() {
    // $('#' + this.homeid).css('color', '#0285D1');
  }

  //
  navFunction(id) {
    console.log(id);
  }

}
