import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { HttpService } from '../../services/http.service';
import { LayersService } from '../../services/layers.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() map: object;
  @Input() floodAreas: object;
  dateNow = new Date();
  selectedDate: string;
  selectedTimePeriod: {start: string, end: string};
  reports: object;
  refreshingLayers = {reports: false, floodAreas: false};
  @Output() reportsSource: {aggregates: number[], labels: string[]};
  @Output() refreshingStats = {reports: true, floodAreas: true};
  @Output() knobStep: {knobUpper: number, knobLower: number};
  @Output() dateTimeMarks: {
    dateMilliseconds: number,
    day: number,
    month: string,
    time: string
  }[];
  @Output() floodAreasCount: number;
  @Output() reportsCount: number;
  @Output() drawChart = new EventEmitter();
  @Output() updateChart = new EventEmitter();
  @Output() updateChartScale = new EventEmitter();
  @Output() rangeSettings = {
    totalDays: 7, // Slider represents 7 days
    intervalHours: 4 // Step size in hours
  };

  constructor(private httpService: HttpService,
    private layersService: LayersService,
    private timeService: TimeService) {
    this.selectedDate = this.dateNow.toISOString().split('T', 1)[0];
  }

  ngOnInit() {
  }

  resetKnobs() {
    this.knobStep = {
      knobUpper: 0,
      knobLower: this.rangeSettings.totalDays * (24 / this.rangeSettings.intervalHours)
    };
    $('#knobUpper').css({top: '0px'});
    $('#knobUpperHover').css({top: '0px'});
    $('#rangeFill').css({
      'margin-top': '0px',
      height: '100%'
    });
    $('#knobLower').css({bottom: '0px'});
    $('#knobLowerHover').css({bottom: '0px'});
  }

  updateReports(date) {
    this.httpService.getReportsArchive(date)
    .then(geojsonData => {
      // pass to map, charts & stats
      this.reports = this.timeService.formatTimestamp(geojsonData);

      this.layersService.renderReports(this.reports, this.map)
      .then(() => {
        const aggregates = this.layersService.getReportsCount(this.map, {
          start: Date.parse(date.start.replace('%2B', '.')),
          end: Date.parse(date.end.replace('%2B', '.'))
        });
        this.reportsCount = aggregates.qlue + aggregates.grasp + aggregates.detik;

        this.reportsSource = {
          aggregates: [aggregates.qlue, aggregates.grasp, aggregates.detik],
          labels: ['Qlue', 'Grasp', 'Detik']
        };

        this.refreshingLayers.reports = false;
        this.refreshingStats.reports = false;
      });
    })
    .catch(error => {
      this.refreshingLayers.reports = false;
      this.refreshingStats.reports = false;
      throw JSON.stringify(error);
    });
  }

  updateFloodAreas(date) {
    this.httpService.getFloodAreasArchive(date)
    .then(data => {
      this.floodAreasCount = this.layersService.updateFloodAreas(data, this.floodAreas, this.map);
      this.refreshingLayers.floodAreas = false;
      this.refreshingStats.floodAreas = false;
    })
    .catch(error => {
      this.refreshingLayers.floodAreas = false;
      this.refreshingStats.floodAreas = false;
      throw JSON.stringify(error);
    });
  }

  dateChanged(event, isInitializing) {
    // Async requests to server, load map layers
    if (event.srcElement.value) {
      this.refreshingLayers = {reports: true, floodAreas: true};

      // Use event.srcElement.value as race condition prevents this.selectedDate to update in time
      this.selectedTimePeriod = this.timeService.format(event.srcElement.value, true);

      // Bind slider markings
      this.dateTimeMarks = this.timeService.getKnobDateTime({
        intervalHours: this.rangeSettings.intervalHours,
        totalDays: this.rangeSettings.totalDays
      }, this.selectedTimePeriod.start);

      // Set knob positions to full scale
      this.resetKnobs();

      this.updateReports(this.selectedTimePeriod);
      this.updateFloodAreas(this.selectedTimePeriod);

      if (isInitializing) {
        // Draw chart
        this.drawChart.emit(this.selectedTimePeriod);
      } else {
        // Update chart
        this.updateChart.emit(this.selectedTimePeriod);
      }
    }
  }

  initData() {
    // Mock date selection while DOM elements initialize
    const event = {srcElement: {value: this.selectedDate}};

    this.dateChanged(event, true);
  }

  updateRange(range) {
    this.refreshingStats = {reports: true, floodAreas: true};
    const startDate = range.upper.dateMilliseconds;
    const endDate = range.lower.dateMilliseconds;

    // Update chart time scale
    this.updateChartScale.emit(range);

    // Filter reports layer
    const filter = ['all', ['>=', 'created_at', startDate], ['<=', 'created_at', endDate]];
    this.layersService.filterLayer(this.map, 'reports', filter);

    const aggregates = this.layersService.getReportsCount(this.map, {start: startDate, end: endDate});
    this.reportsCount = aggregates.qlue + aggregates.grasp + aggregates.detik;
    this.refreshingStats.reports = false;

    this.reportsSource = {
      aggregates: [aggregates.qlue, aggregates.grasp, aggregates.detik],
      labels: ['Qlue', 'Grasp', 'Detik']
    };

    // Update flood areas layer
    const timePeriod = this.timeService.format({
      start: startDate,
      end: endDate
    }, false);
    this.httpService.getFloodAreasArchive(timePeriod)
    .then(data => {
      this.floodAreasCount = this.layersService.updateFloodAreas(data, this.floodAreas, this.map);
      this.refreshingStats.floodAreas = false;
    })
    .catch(error => console.log(JSON.stringify(error)));
  }

  get enableSlider() {
    return (
      !(this.refreshingLayers.reports && this.refreshingLayers.floodAreas)
      && this.reports
    );
  }
}
