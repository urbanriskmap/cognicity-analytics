import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class TableService {
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

  canActivate() {
    if (this.allowReport) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
