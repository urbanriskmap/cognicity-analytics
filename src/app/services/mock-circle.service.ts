import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockCircleService { 
  ads: object[];
  constructor() {
    this.ads = [];
  } 

  getAds() {
    let ad = {
      name: 'mock-from circle-serv',
      circle: {
        getCenter: () => {
          return {
            lat: 100,
              lng: 90,
          };
        },
        getRadius: () => {
          return 2000;
        }
      },
      adCreativeId: 123
    };

    return [ad];
  }

  addAd(ad) {
    this.ads.push(ad);
  }

  registerMap(map) {

  }

  drawCircle(center, radius) {
    return {on: () => {return} };
  }

  public getMap() {
    return Observable.of({
    });
  }
} 
