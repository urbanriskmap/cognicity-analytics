import { Component, OnInit } from '@angular/core';
import { AdComponent } from './ad/ad.component';
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
    image_link: string
  }[];

  constructor() {
    this.adCreatives = [
      {
        id: 6092449981262,
        message: 'Its flooding yo',
        link: 'http://riskmap.org',
        image_link: 'http://via.placeholder.com/350x150'
      },
      {
        id: 2,
        message: 'Advert 2',
        link: 'http://riskmap.org',
        image_link: 'http://via.placeholder.com/350x150'
      },
      {
        id: 3,
        message: 'Advert 3',
        link: 'http://riskmap.org',
        image_link: 'http://via.placeholder.com/350x150'
      },
      {
        id: 7,
        message: 'Advert 7',
        link: 'http://riskmap.org',
        image_link: 'http://via.placeholder.com/350x150'
      },
      {
        id: 4,
        message: 'Advert 4',
        link: 'http://riskmap.org',
        image_link: 'http://via.placeholder.com/350x150'
      }
    ];
  }

  ngOnInit() {
    $('#adsContentWrapper').on('mousewheel DOMMouseScroll', (e) => {
      const currentLocation = $('#adsContentWrapper').scrollLeft();
      let delta = ( <any>e.originalEvent).deltaY;
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
