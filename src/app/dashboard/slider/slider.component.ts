import { Component, Input, Output, OnInit } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { LayersService } from '../../services/layers.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  dateNow = new Date();
  selectedDate: string;
  refreshingReports: boolean;
  refreshingFloodAreas: boolean;
  reports: object;
  @Input() map: object;
  @Input() floodAreas: object;

  constructor(private sliderService: SliderService, private layersService: LayersService) {
    this.selectedDate = this.dateNow.toISOString().split('T', 1)[0];
  }

  ngOnInit() {
  }

  dateChanged(event) {
    // Async requests to server, load map layers
    if (event.srcElement.value) {
      this.refreshingReports = true;
      this.refreshingFloodAreas = true;
      this.updateReports(event.srcElement.value);
      this.updateFloodAreas(event.srcElement.value);
    }
  }

  updateReports(date) {
    this.sliderService.getReportsArchive(date)
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
    this.sliderService.getFloodAreasArchive(date)
    .then(data => {
      this.layersService.updateFloodAreas(data, this.floodAreas, this.map);
      this.refreshingFloodAreas = false;
    })
    .catch(error => {
      this.refreshingFloodAreas = false;
      throw JSON.stringify(error);
    });
  }

  rangeChanged(event) {
    console.log(event);
    // use 'time' service to convert knob positions to datetime filters
    // use 'layers' service to update reports & flood areas
  }
}
