import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as moment from 'moment-timezone';

import { environment as env } from '../../environments/environment';
import { HttpService } from '../services/http.service';
import { LayersService } from '../services/layers.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-rainfall',
  templateUrl: './rainfall.component.html',
  styleUrls: ['./rainfall.component.scss']
})
export class RainfallComponent implements OnInit {
  map: mapboxgl.Map;
  reports: any;
  selValue = 0;
  startDate: moment;
  intervalMilliseconds = 1800 * 1000; // half hour

  heatmapProperties = {
    id: 'rainfall',
    type: 'heatmap',
    source: {
      type: 'vector',
      url: 'mapbox://asbarve.8zkt523e'
    },
    'source-layer': 'rainfall',
    paint: {
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'gpm'],
        0, 0,
        255, 1
      ],
      // 'heatmap-intensity': [
      //   'interpolate',
      //   ['linear'],
      //   ['zoom'],
      //   6, 1,
      //   14, 3
      // ],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(255, 255, 255, 0)',
        0.125, 'rgba(83, 149, 255, 0.7)',
        0.25, 'rgba(6, 62, 197, 0.85)',
        0.5, 'rgba(129, 15, 124, 0.9)',
        1, 'rgba(255, 226, 7, 0.9)'
      ],
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 1,
        7, 30,
        7.5, 45,
        8, 60,
        8.5, 90,
        9, 120,
        9.5, 180,
        10, 240,
        10.5, 360,
        11, 480,
        11.5, 720,
        12, 960,
        12.5, 1440,
        13, 1920,
        13.5, 2880,
        14, 3840
      ]
    },
    filter: ['==', 'timestamp', '2017-11-02T00:00:00']
  };

  // Test rain data pixels
  // circleProperties = {
  //   id: 'rainfall',
  //   type: 'circle',
  //   source: {
  //     type: 'vector',
  //     url: 'mapbox://asbarve.8zkt523e'
  //   },
  //   'source-layer': 'rainfall',
  //   paint: {
  //     'circle-color': [
  //       'interpolate',
  //       ['exponential', 1],
  //       ['get', 'gpm'],
  //       0, 'rgba(255, 255, 255, 0)',
  //       0.125, 'rgba(83, 149, 255, 0.7)',
  //       0.25, 'rgba(6, 62, 197, 0.85)',
  //       0.5, 'rgba(129, 15, 124, 0.9)',
  //       1, 'rgba(255, 226, 7, 0.9)'
  //     ],
  //     'circle-radius': 5
  //   },
  //   filter: ['==', 'timestamp', '2017-11-02T00:00:00']
  // };

  constructor(
    private httpService: HttpService,
    private layersService: LayersService,
    public timeService: TimeService
  ) {
    moment.tz.setDefault(env.timezones.tz);

    this.startDate = moment([2017, 10, 2]); // 2 Nov 00:00 IST (string in UTC)
  }

  ngOnInit() {
    const self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'rainfallMap',
      center: [80.2, 13],
      zoom: 10,
      minZoom: 7,
      style: 'mapbox://styles/mapbox/light-v9',
      hash: false,
      preserveDrawingBuffer: true
    });

    self.map.on('style.load', () => {
      // render rainfall data
      self.map.addLayer(self.heatmapProperties);
      // self.map.addLayer(self.circleProperties); // test rain data pixels

      self.httpService.getReportsArchive({
        start: '2017-11-01T18%3A30%3A00%2B0530', // 2 Nov 00:00, IST
        end: '2017-11-05T18%3A30%3A00%2B0530'  // 6 Nov 00:00, IST
      })
      .then(geojsonData => {
        // pass to map, charts & stats
        self.reports = self.timeService.formatTimestamp(geojsonData);

        self.layersService.renderReports(self.reports, self.map)
        .then(() => {

        })
        .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
    });

    self.map.on('click', 'reports', e => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const prop = e.features[0].properties;

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            'Flood height: ' + JSON.parse(prop.report_data).flood_depth + 'cm' +
            '<br>Time: ' + moment(prop['created_at']).format('DD MMM HH:mm') +
            '<br>Text: ' + prop.text
          )
          .addTo(self.map);
      });
  }

  updateHeatmap(timestamp) {
    const filterString = moment(timestamp).subtract(5.5, 'hours').format().substring(0, 19);

    this.map.setFilter('rainfall', ['==', 'timestamp', filterString]);
  }

  updateReports(timestamp) {
    const endMilliseconds = timestamp;
    const startMilliseconds = endMilliseconds - (30 * 60 * 1000); // subtract half hour
    const filter = ['all', ['>', 'created_at', startMilliseconds], ['<=', 'created_at', endMilliseconds]];

    this.map.setFilter('reports', filter);
  }

  get currentTime() {
    return moment(
      parseInt(this.startDate.format('x'), 10)
      + (this.selValue * this.intervalMilliseconds)
    ).format('DD MMM YY HH:mm');
  }

  rainSlider(e) {
     this.selValue = e.value;

     this.updateRainfallMap();
  }

  animateRainfall() {
    let n = 0;

    window.setInterval(() => { // set clearInterval, else function continues to run
      n++;
      this.selValue = n;

      const timestamp = parseInt(moment(this.startDate).format('x'), 10)
        + (n * this.intervalMilliseconds);

      this.updateHeatmap(timestamp);
      this.updateReports(timestamp);
    }, 100);
  }

  changeSlider(val) {
    this.selValue += val;

    this.updateRainfallMap();
  }

  updateRainfallMap() {
    const timestamp = parseInt(moment(this.startDate).format('x'), 10)
      + (this.selValue * this.intervalMilliseconds);

    this.updateHeatmap(timestamp);
    this.updateReports(timestamp);
  }
}
