import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }

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
