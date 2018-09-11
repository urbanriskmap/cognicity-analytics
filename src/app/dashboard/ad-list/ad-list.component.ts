import { Component, OnInit } from '@angular/core';
import { CircleService } from '../../services/circle.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})
export class AdListComponent implements OnInit {
  ads: object[];

  constructor(private circleService: CircleService) { }

  ngOnInit() {
    // need to fill in the ads that are in play right now
    // get that info from fb-ads, through the dashboard parent
    this.ads = this.circleService.getAds();
  }

}
