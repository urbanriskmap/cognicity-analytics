import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as $ from 'jquery';

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

  lastAreaUpdate: string; // TODO: store in LayersService ??

  reports: object;

  generatingTableData = false;
  refreshingLayers = {reports: false, floodAreas: false};
  @Output() refreshingStats = {reports: true, floodAreas: true};
  @Output() reportsSource: {aggregates: number[], labels: string[]};
  @Output() knobStep: {knobUpper: number, knobLower: number};
  @Output() floodAreasCount: number;
  @Output() reportsCount: number;
  @Output() drawChart = new EventEmitter();
  @Output() updateChart = new EventEmitter();
  @Output() updateChartScale = new EventEmitter();
  @Output() dateTimeMarks: {
    timestamp: any,
    mark: string
  }[];
  @Output() rangeSettings = {
    totalDays: 7, // Slider represents 7 days
    intervalHours: 4 // Step size in hours
  };

  constructor(
    private httpService: HttpService,
    private layersService: LayersService,
    private timeService: TimeService,
    private tableService: TableService
  ) { }

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

  countReports(range): void {
    const start = this.timeService.getMilliseconds(range.start);
    const end = this.timeService.getMilliseconds(range.end);

    const counts = this.layersService.getReportsCount(
      this.map,
      {start: start, end: end},
      this.tableService.districts
    );

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
  }

  updateReports(range): void {
    this.httpService.getReportsArchive(range)
    .then(geojsonData => {
      // pass to map, charts & stats
      this.reports = this.timeService.formatTimestamp(geojsonData);

      this.layersService.renderReports(this.reports, this.map)
      .then(() => {
        this.countReports(range);

        this.refreshingLayers.reports = false;
        this.refreshingStats.reports = false;
        this.generatingTableData = false;
        this.tableService.allowReport = true;
      });
    })
    .catch(error => {
      this.refreshingLayers.reports = false;
      this.refreshingStats.reports = false;
      this.generatingTableData = false;
      this.tableService.allowReport = false;
      throw JSON.stringify(error);
    });
  }

  updateFloodAreas(range) {
    this.httpService.getFloodAreasArchive(range)
    .then(data => {

      const areas = this.layersService.updateFloodAreas(
        data,
        this.floodAreas,
        this.map,
        this.tableService.districts
      );

      // Store total flood areas count
      this.floodAreasCount = areas.total;

      // Update districts with parent, local areas count breakdown
      this.tableService.districts = areas.districts;

      // Update last updated date for flood affected areas
      this.lastAreaUpdate = areas.lastUpdate;

      this.refreshingLayers.floodAreas = false;
      this.refreshingStats.floodAreas = false;
      this.generatingTableData = false;
      this.tableService.allowReport = true;
    })
    .catch(error => {
      this.refreshingLayers.floodAreas = false;
      this.refreshingStats.floodAreas = false;
      this.generatingTableData = false;
      this.tableService.allowReport = false;
      throw JSON.stringify(error);
    });
  }

  dateInteraction(type: string, event: any, isInitializing: boolean) {
    console.log(event.value);
    // Disable dependent components
    this.refreshingLayers = {reports: true, floodAreas: true};
    this.generatingTableData = true;
    this.tableService.allowReport = false;

    this.timeService.updateDates(type, event.value, event.target.min, event.target.max);

    // Format date values and set date range
    this.timeService.setDateRange(true);

    // Bind slider markings
    this.dateTimeMarks = this.timeService.getKnobDateTime(
      this.rangeSettings.intervalHours,
      this.rangeSettings.totalDays
    );

    // Set knob positions to full scale
    this.resetKnobs();

    this.updateReports(this.timeService.selectedDateRange);
    this.updateFloodAreas(this.timeService.selectedDateRange);

    // Inject timeService in charts, don't pass
    if (isInitializing) {
      // Draw chart
      this.drawChart.emit(this.timeService.selectedDateRange);
    } else {
      // Update chart
      this.updateChart.emit(this.timeService.selectedDateRange);
    }
  }

  initData() {
    // Mock date selection while DOM elements initialize
    const event = {
      target: {
        min: this.timeService.dateLimits.end.min,
        max: this.timeService.dateLimits.end.max
      },
      value: this.timeService.dateLimits.end.max
    };

    // Trigger get reports, flood areas, draw charts
    this.dateInteraction('end', event, true);
  }

  updateRange(range) {
    this.refreshingStats = {reports: true, floodAreas: true};

    this.timeService.updateTimeframe(
      range.upper.timestamp,
      range.lower.timestamp
    );

    const start = this.timeService.getMilliseconds(range.upper.timestamp);
    const end = this.timeService.getMilliseconds(range.lower.timestamp);

    this.updateChartScale.emit(range);

    // Filter reports layer
    const filter = ['all', ['>=', 'created_at', start], ['<=', 'created_at', end]];
    this.layersService.filterLayer(this.map, 'reports', filter);

    // Update reports count
    this.countReports({
      start: start,
      end: end
    });

    this.refreshingStats.reports = false;

    // Update flood areas layer and store area counts
    this.updateFloodAreas(this.timeService.selectedTimeframe);
  }

  get enableSlider() {
    return (
      !(this.refreshingLayers.reports && this.refreshingLayers.floodAreas)
      && this.reports
    );
  }
}
