import { Component, OnInit } from '@angular/core';
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
  isRefreshing: boolean;
  reports: object;

  constructor(private sliderService: SliderService, private layersService: LayersService) {
    this.selectedDate = this.dateNow.toISOString().split('T', 1)[0];
  }

  ngOnInit() {
  }

  dateChanged(event) {
    this.isRefreshing = true;
    if (event.srcElement.value) {
      this.sliderService.getReportsArchive(event.srcElement.value)
      .then(geojsonData => {
        // pass to map, charts & stats
        this.reports = geojsonData;
        this.isRefreshing = false;
        this.layersService.loadReportsLayer(this.reports);
      })
      .catch(error => {
        this.isRefreshing = false;
        throw JSON.stringify(error);
      });
    }
  }
}
