import { Component, Input, Output, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { LayersService } from '../../services/layers.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.less'
  ]
})
export class MapComponent implements OnInit {
  @Output() map: mapboxgl.Map;

  constructor(private layersService: LayersService) { }

  ngOnInit() {
    const self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'mapContainer',
      center: [106.84, -6.15],
      zoom: 10,
      style: 'mapbox://styles/mapbox/light-v9',
      hash: false,
      preserveDrawingBuffer: true
    });
  }
}
