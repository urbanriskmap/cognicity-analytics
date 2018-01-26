import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { LayersService } from '../../services/layers.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.scss'
  ]
})
export class MapComponent implements OnInit {
  @Output() floodAreas: object;
  @Output() map: mapboxgl.Map;
  @Output() finishedLoading = new EventEmitter();

  constructor(
    private layersService: LayersService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    const self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhc2VwZTAwNmYydXFrOThrMWxmcGIifQ.Dl07iYeyvtqJxOVXa9_A0A';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'mapContainer',
      center: [106.86, -6.17],
      zoom: 11,
      minZoom: 10,
      style: 'mapbox://styles/urbanriskmap/cjcta37vx0vue2rnxg3z6qynz',
      hash: false,
      preserveDrawingBuffer: true
    });
    // Add zoom and rotation controls to the map.
    self.map.addControl(new mapboxgl.NavigationControl(), 'top-right');


    self.map.on('style.load', () => {
      // Load neighborhood polygons
      self.httpService.getFloodAreas('jbd')
      .then(geojsonData => {
        self.floodAreas = geojsonData;
        self.layersService.loadFloodAreas(self.floodAreas, self.map)
        .then(() => {
          self.finishedLoading.emit();
        })
        .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
    });
  }
}
