import { Component, Input, OnInit } from '@angular/core';
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
  loadingReports: boolean;
  loadingFloodAreas: boolean;
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
      this.loadingReports = true;
      this.loadingFloodAreas = true;
      this.updateReports(event.srcElement.value);
      this.updateFloodAreas(event.srcElement.value);
    }
  }

  updateReports(date) {
    this.sliderService.getReportsArchive(date)
    .then(geojsonData => {
      // pass to map, charts & stats
      this.reports = geojsonData;
      this.loadingReports = false;
      this.layersService.renderReports(this.reports, this.map);
    })
    .catch(error => {
      this.loadingReports = false;
      throw JSON.stringify(error);
    });
  }

  updateFloodAreas(date) {
    this.sliderService.getFloodAreasArchive(date)
    .then(data => {
      if (data['length'] > 0) {
        this.layersService.updateFloodAreas(data, this.floodAreas, this.map);
      }
      this.loadingFloodAreas = false;
    })
    .catch(error => {
      this.loadingFloodAreas = false;
      throw JSON.stringify(error);
    });
  }
}
