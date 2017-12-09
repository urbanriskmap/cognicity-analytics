import { Injectable } from '@angular/core';

@Injectable()
export class LayersService {

  constructor() { }

  loadReportsLayer(reportsGeojson) {
    console.log(reportsGeojson);
  }
}
