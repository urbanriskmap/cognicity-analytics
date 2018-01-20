import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  someValue = 1;
  otherValue = 5;

  constructor() { }

  resizeComponents() {
    const mapHeight = $(window).height() - $('#navBar').height() - $('#analyticsWrapper').height();
    $('#mapWrapper').height(mapHeight);
    $('#sliderWrapper').height(mapHeight - 24);
  }

  ngOnInit() {
    this.resizeComponents();
    $(window).resize(() => {
      this.resizeComponents();
    });
  }

}
