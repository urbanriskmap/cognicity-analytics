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
      this.selectedTimePeriod = this.timeService.format(event.srcElement.value, true);

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
    const startDate = range.upper.dateMilliseconds;
    const endDate = range.lower.dateMilliseconds;

    // Filter reports layer
    const filter = ['all', ['>=', 'created_at', startDate], ['<=', 'created_at', endDate]];
    this.layersService.filterLayer(this.map, 'reports', filter);

    // Update flood areas layer
    const timePeriod = this.timeService.format({
      start: startDate,
      end: endDate
    }, false);
    this.httpService.getFloodAreasArchive(timePeriod)
    .then(data => this.layersService.updateFloodAreas(data, this.floodAreas, this.map))
    .catch(error => console.log(JSON.stringify(error)));
  }
}
