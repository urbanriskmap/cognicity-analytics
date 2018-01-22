import { Injectable } from '@angular/core';

@Injectable()
export class TableService {
  districts = {
    '3171': { name: 'Jakarta Selatan',
      reportsCount: 0, minDepth: null, maxDepth: null, parentAreaCount: 0, localAreaCount: 0, parentAreaNames: []},
    '3172': { name: 'Jakarta Timur',
      reportsCount: 0, minDepth: null, maxDepth: null, parentAreaCount: 0, localAreaCount: 0, parentAreaNames: []},
    '3173': { name: 'Jakarta Pusat',
      reportsCount: 0, minDepth: null, maxDepth: null, parentAreaCount: 0, localAreaCount: 0, parentAreaNames: []},
    '3174': { name: 'Jakarta Barat',
      reportsCount: 0, minDepth: null, maxDepth: null, parentAreaCount: 0, localAreaCount: 0, parentAreaNames: []},
    '3175': { name: 'Jakarta Utara',
      reportsCount: 0, minDepth: null, maxDepth: null, parentAreaCount: 0, localAreaCount: 0, parentAreaNames: []}
  };

  constructor() { }

}
