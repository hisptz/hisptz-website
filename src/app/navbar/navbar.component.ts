import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems: any;
  constructor() { }

  ngOnInit() {
    //Bottom item will be the first to be displayed
    this.menuItems = [
      {name: "share", path: "#", children: [
        {name: "facebook",path: "/facebook"},
        {name: "facebook",path: "/facebook"}
      ]},
      {name: "About", path: "/about"},
      {name: "Home", path: "/home"}
    ]
    console.log(this.menuItems)
  }

}
