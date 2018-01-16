import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
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

  constructor(private layersService: LayersService,
    private httpService: HttpService) { }

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

    self.map.on('style.load', () => {
      // Load neighborhood polygons
      self.httpService.getFloodAreas('jbd')
      .then(geojsonData => {
        self.floodAreas = geojsonData;
        self.layersService.loadFloodAreas(self.floodAreas, self.map)
        .then(() => {
          self.finishedLoading.emit();
        });
      })
      .catch(error => {
        throw JSON.stringify(error);
      });
    });
  }
}
