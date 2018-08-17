import { Component, OnInit } from '@angular/core';
import { AdComponent } from './ad/ad.component';
import { HttpService } from '../../services/http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-fb-ads',
  templateUrl: './fb-ads.component.html',
  styleUrls: ['./fb-ads.component.scss']
})
export class FbAdsComponent implements OnInit {
  adCreatives: {
    id: number,
    message: string,
    link: string,
    image_url: string
  }[];

  constructor(private http: HttpService ) {
    this.adCreatives = [];
  }

  ngOnInit() {

    // make getAdCreative call from http service
    this.http.getAllAdCreatives()
      .then((res) => this.adCreatives=res);

    // store in this.adCreatives.
    // Will automatically show up when it resolves.

    $('#adsContentWrapper').on('mousewheel DOMMouseScroll', (e) => {
      const currentLocation = $('#adsContentWrapper').scrollLeft();
      let delta = ( <any>e.originalEvent).deltaY;
      // because Firefox doesn't have the same events as chrome. Yay!
      if (!delta) {
        const SCALE_FOR_FIREFOX = 14;
        delta = ( <any>e.originalEvent).detail * SCALE_FOR_FIREFOX;
      }
      const change = currentLocation - delta;
      $('#adsContentWrapper').scrollLeft(change);
      const finalPos = $('#adsContentWrapper').scrollLeft();
      e.preventDefault();
    });
  }
}
