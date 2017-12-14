import { Component, Input, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { LayersService } from '../../services/layers.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @Output() rangeSettings = {
    totalDays: 7, // Slider represents 7 days
    intervalHours: 4 // Step size in hours
  };
  dateNow = new Date();
  selectedDate: string;
  selectedTimePeriod: {start: string, end: string};
  refreshingReports: boolean;
  refreshingFloodAreas: boolean;
  reports: object;
  @Input() map: object;
  @Input() floodAreas: object;
  @Output() dateTimeMarks: object[];

  constructor(private httpService: HttpService,
    private layersService: LayersService,
    private timeService: TimeService) {
    this.selectedDate = this.dateNow.toISOString().split('T', 1)[0];
  }

  ngOnInit() {
  }

  dateChanged(event) {
    // Async requests to server, load map layers
    if (event.srcElement.value) {
      this.refreshingReports = true;
      this.refreshingFloodAreas = true;

      // Use event.srcElement.value as race condition prevents this.selectedDate to update in time
      this.selectedTimePeriod = this.timeService.format(event.srcElement.value);

      // Bind slider markings
      this.dateTimeMarks = this.timeService.getKnobDateTime({
        intervalHours: this.rangeSettings.intervalHours,
        totalDays: this.rangeSettings.totalDays
      }, this.selectedTimePeriod.start);

      this.updateReports(this.selectedTimePeriod);
      this.updateFloodAreas(this.selectedTimePeriod);
    }
  }

  updateReports(date) {
    this.httpService.getReportsArchive(date)
    .then(geojsonData => {
      // pass to map, charts & stats
      this.reports = geojsonData;
      this.refreshingReports = false;
      this.layersService.renderReports(this.reports, this.map);
    })
    .catch(error => {
      this.refreshingReports = false;
      throw JSON.stringify(error);
    });
  }

  updateFloodAreas(date) {
    this.httpService.getFloodAreasArchive(date)
    .then(data => {
      this.layersService.updateFloodAreas(data, this.floodAreas, this.map);
      this.refreshingFloodAreas = false;
    })
    .catch(error => {
      this.refreshingFloodAreas = false;
      throw JSON.stringify(error);
    });
  }

  updateRange(range) {
    console.log(range);
    // use 'time' service to convert knob positions to datetime filters
    // use 'layers' service to update reports & flood areas
  }
}
