import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class TableService {
  selectedChart:string;

  regions = this.makeRegions();

  totalDisaster = {
    floodCount: 0,
    earthquakeCount: 0,
    windCount: 0,
    hazeCount: 0,
    fireCount: 0,
    volcanoCount: 0,
    totalCount: 0
  };

  districts = {
    '3171': { name: 'Jakarta Selatan',
      reportsCount: 0, parentAreasCount: 0, parentAreas: {}},
    '3172': { name: 'Jakarta Timur',
      reportsCount: 0, parentAreasCount: 0, parentAreas: {}},
    '3173': { name: 'Jakarta Pusat',
      reportsCount: 0, parentAreasCount: 0, parentAreas: {}},
    '3174': { name: 'Jakarta Barat',
      reportsCount: 0, parentAreasCount: 0, parentAreas: {}},
    '3175': { name: 'Jakarta Utara',
      reportsCount: 0, parentAreasCount: 0, parentAreas: {}}
  };

  allowReport = false;

  constructor(public router: Router) { }

  makeRegions() {
    let reports = [];
    for (let i = 0; i < environment.region_name.length; i++) {
      reports.push({
        name: environment.region_name[i],
        floodCount: 0,
        earthquakeCount: 0,
        windCount: 0,
        hazeCount: 0,
        fireCount: 0,
        volcanoCount: 0,
        areaCount: 0
      }) 
    }
    return reports;
  }

  canActivate() {
    if (this.allowReport) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
