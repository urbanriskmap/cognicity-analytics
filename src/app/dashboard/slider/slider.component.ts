import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';

import { HttpService } from '../../services/http.service';
import { LayersService } from '../../services/layers.service';
import { TimeService } from '../../services/time.service';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() map: object;
  @Input() floodAreas: object;
  dateLimits = {
    end: {
      min: null,
      max: new Date()
    },
    start: {
      min: new Date(2016, 11, 8),
      max: null
    }
  };
  startDate: Date;
  endDate: Date;
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
  @Output() generatingTableData = false;

  constructor(private httpService: HttpService,
    private layersService: LayersService,
    private timeService: TimeService,
    private tableService: TableService) {
      // Round off time to next hour:00:00
      this.dateLimits.end.max.setHours(this.dateLimits.end.max.getHours() + 1);
      this.dateLimits.end.max.setMinutes(0);
      this.dateLimits.end.max.setSeconds(0);
      this.dateLimits.end.max.setMilliseconds(0);

      this.dateLimits.end.min = this.getOtherDate('end', this.dateLimits.start.min);
      this.dateLimits.start.max = this.getOtherDate('start', this.dateLimits.end.max);

      this.endDate = this.dateLimits.end.max;
      this.startDate = this.getOtherDate('start', this.endDate);
  }

  getOtherDate(type, date) {
    if (type === 'start') {
      // substract 7 days (in milliseconds) to get start date
      return new Date(Date.parse(date.toString()) - (7 * 24 * 60 * 60 * 1000));
    } else if (type === 'end') {
      // add 7 days (in milliseconds) to get end date
      return new Date(Date.parse(date.toString()) + (7 * 24 * 60 * 60 * 1000));
    }
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

  countReports(range) {
    this.layersService.getReportsCount(this.map, range, this.tableService.districts)
    .then(counts => {
      // Store reports count sum
      this.reportsCount = counts.aggregates.qlue +
        counts.aggregates.grasp +
        counts.aggregates.detik;

      // Store reports count by source
      this.reportsSource = {
        aggregates: [
          counts.aggregates.qlue,
          counts.aggregates.grasp,
          counts.aggregates.detik
        ],
        labels: ['Qlue', 'Grasp', 'Detik']
      };

      // Update districts with reports count breakdown
      this.tableService.districts = counts.districts;
    });
  }

  updateReports(date) {
    this.httpService.getReportsArchive(date)
    .then(geojsonData => {
      // pass to map, charts & stats
      this.reports = this.timeService.formatTimestamp(geojsonData);

      this.layersService.renderReports(this.reports, this.map)
      .then(() => {
        this.countReports({
          start: Date.parse(date.start.replace('%2B', '.')),
          end: Date.parse(date.end.replace('%2B', '.'))
        });

        this.refreshingLayers.reports = false;
        this.refreshingStats.reports = false;
        this.generatingTableData = false;
      });
    })
    .catch(error => {
      this.refreshingLayers.reports = false;
      this.refreshingStats.reports = false;
      this.generatingTableData = false;
      throw JSON.stringify(error);
    });
  }

  updateFloodAreas(date) {
    this.httpService.getFloodAreasArchive(date)
    .then(data => {

      this.layersService.updateFloodAreas(
        data, this.floodAreas, this.map, this.tableService.districts
      ).then(areas => {
        // Store total flood areas count
        this.floodAreasCount = areas.total;

        // Update districts with parent, local areas count breakdown
        this.tableService.districts = areas.districts;
      });

      this.refreshingLayers.floodAreas = false;
      this.refreshingStats.floodAreas = false;
      this.generatingTableData = false;
    })
    .catch(error => {
      this.refreshingLayers.floodAreas = false;
      this.refreshingStats.floodAreas = false;
      this.generatingTableData = false;
      throw JSON.stringify(error);
    });
  }

  dateInteraction(type: string, event: any, isInitializing: boolean) {
    if (event.value && event.value >= event.target.min && event.value <= event.target.max) {
      // Autofill other date
      if (type === 'start') {
        this.endDate = this.getOtherDate('end', event.value);
        // Use event.value to manually update startDate
        // as race condition(?) prevents to update it in time
        this.startDate = event.value;
      } else if (type === 'end') {
        this.endDate = event.value;
        this.startDate = this.getOtherDate('start', event.value);
      }
    } else {
      // reset dates
      // TODO: show invalid date msg
      this.endDate = this.dateLimits.end.max;
      this.startDate = this.getOtherDate('start', this.endDate);
    }

    this.refreshingLayers = {reports: true, floodAreas: true};
    this.generatingTableData = true;

    // Format date values and store in timePeriod object
    this.selectedTimePeriod = this.timeService.format(
      Date.parse((this.startDate).toISOString()),
      Date.parse((this.endDate).toISOString())
    );

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

  initData() {
    // Mock date selection while DOM elements initialize
    const event = {
      target: {
        min: this.dateLimits.end.min,
        max: this.dateLimits.end.max
      },
      value: this.dateLimits.end.max
    };

    // Trigger get reports, flood areas, draw charts
    this.dateInteraction('end', event, true);
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

    // Update reports count
    this.countReports({
      start: startDate,
      end: endDate
    });

    this.refreshingStats.reports = false;

    // Update flood areas layer and store area counts
    this.updateFloodAreas(
      this.timeService.format(startDate, endDate)
    );
  }

  get enableSlider() {
    return (
      !(this.refreshingLayers.reports && this.refreshingLayers.floodAreas)
      && this.reports
    );
  }
}
