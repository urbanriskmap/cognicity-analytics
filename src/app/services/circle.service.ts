import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs';
import { filter, publish } from 'rxjs/operators';
import * as MapboxCircle from 'mapbox-gl-circle';

@Injectable()
export class CircleService {
  mapChanges: ConnectableObservable<object>;

  map: object;

  constructor() {
    this.mapChanges = new Observable( observer => {
      observer.next(this.map);
    }).pipe(publish()) as ConnectableObservable<object>;
  }

  getMap() {
    console.log('getMap');

    // return Observable.timer(1000, 1000).pipe((this.mapChanges), filter((map) => map!=undefined));
    // what happens if we don't have the map yet?
    return this.mapChanges;
  }

  registerMap(map) {
    console.log('map registered');
    this.map = map;
    // will let the initial calls get the map
    this.mapChanges.connect();
    // now that we have the map, let's replace the original observer
    this.mapChanges = Observable.of(this.map) as ConnectableObservable<object>;
  }

  drawCircle(center, radius) {
    console.log('adding circle');

    // taken from the mapbox-gl-circle quickstart
    const myCircle = new MapboxCircle(center, radius, {
      editable: true,
      minRadius: 1500,
      fillColor: '#29AB87',
      strokeWeight: .9,
    }).addTo(this.map);
    return myCircle;
  }


}
