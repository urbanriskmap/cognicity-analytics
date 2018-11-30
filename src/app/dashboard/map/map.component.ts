import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { LayersService } from '../../services/layers.service';
import { HttpService } from '../../services/http.service';
import { environment as env } from '../../../environments/environment';

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
      attributionControl: true,
      container: 'mapContainer',
      center: [80.2, 13],
      zoom: 11,
      minZoom: 10,
      style: 'mapbox://styles/mapbox/light-v9',
      hash: false,
      preserveDrawingBuffer: true
    });
    // Add zoom and rotation controls to the map.
    self.map.addControl(new mapboxgl.NavigationControl(), 'top-right');


    self.map.on('style.load', () => {
      // Load neighborhood polygons
      self.httpService.getFloodAreas(env.instance_region)
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
