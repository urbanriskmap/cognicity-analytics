import { Component, OnInit, Input } from '@angular/core';
import { AdCreativeComponent } from './ad-creative/ad-creative.component';
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
    // store in this.adCreatives.
    // Will automatically show up when it resolves.
    this.http.getAllAdCreatives()
      .then((res) => this.adCreatives = res)
      .catch((err) => console.error(err));
  }
}
