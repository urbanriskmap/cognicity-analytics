import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { CircleService } from '../../../services/circle.service';

@Component({
  selector: 'app-ad-creative',
  templateUrl: './ad-creative.component.html',
  styleUrls: ['./ad-creative.component.scss']
})
export class AdCreativeComponent implements OnInit {
  @Input() id: number = 0;
  @Input() message: string = '';
  @Input() link: string = '';
  @Input() image_url: string = '';
  map: object;

  ableToSelect: boolean;
  ads: object[];
  ad: object;

  constructor(
    private httpService: HttpService,
    private circleService: CircleService
  ) {
    this.ads = [];
  }

  initMap(map) {

  }

  select() {
    console.log('select clicked');
    this.circleService.getMap().subscribe((map) => {
      this.ableToSelect = true;
      const cir = this.circleService.drawCircle({lat: -6.1751, lng: 106.8650}, 2000);
      // call circle.getCenter to get the center
      const ad = {circle: cir, adCreativeId: this.id};
      cir.on('centerchanged', (circleObj) => {
        console.log( 'New center:', circleObj.getCenter());
        console.log( 'radius is now ' + (circleObj.getRadius() / 1000.0).toString() + ' km' );
      });
      this.ads.push(ad);
      this.circleService.addAd(ad);
      console.log(this.ads);
    });
  }

  submit() {
    // let's pick the currently selected ad
    this.httpService.submitAdForApproval(this);
  }

  play() {
    // once facebook has approved the ad you need to
    // Move from 'PAUSED' to 'ACTIVE'
  }

  ngOnInit() {
    this.circleService.getMap().subscribe((map) => {
      this.ableToSelect = true;
      this.map = map;
    },
      (error) => {
        console.log('no map yet');
      });
  }
}
