import { Component, OnInit } from '@angular/core';
import { CircleService } from '../../services/circle.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})
export class AdListComponent implements OnInit {
  submittedAd: {
    name: string,
    geo: {
      lat: number,
      lng: number,
      radius: number,
    },
    adCreativeId: number
  };
  ads: object[];

  constructor(
    private circleService: CircleService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    // need to fill in the ads that are in play right now
    // get that info from fb-ads, through the dashboard parent
    this.ads = this.circleService.getAds();
  }

  submit(ad) {
    let adToSubmit = {
      name: 'test',
      geo: {
        lat: ad.circle.getCenter().lat,
        lng: ad.circle.getCenter().lng,
        radius: ad.circle.getRadius()/1000 //make it km
      },
      adCreativeId: ad.adCreativeId
    }
    console.log('Ad Submitted');
    console.log(adToSubmit);
    this.httpService.submitAdForApproval(adToSubmit);
  }
}
