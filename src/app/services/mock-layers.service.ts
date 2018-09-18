export class MockLayersService {
  constructor() {}

  renderReports(reportsGeojson, map) {
    return new Promise(resolve => {
      resolve(true);
    });
  }


  getReportsCount(map, {start, end}, districts) {
    let heh = {
      aggregates: 3,
      districts: 4,
    };
    return heh; 
  }


  loadFloodAreas(floodAreasGeojson, map) {
    return new Promise(resolve => {
      resolve(true);
    });
  }


  updateFloodAreas(floodStates, floodAreas, map, districts): {
    total: number,
    districts: any,
    lastUpdate: string
  } {

    return {
      total: 2,
      districts: 4,
      lastUpdate: 'date'
    };
  }

  filterLayer(map, layer, filter) {
  }
}
