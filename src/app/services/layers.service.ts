import { Injectable } from '@angular/core';

@Injectable()
export class LayersService {

  constructor() { }

  renderReports(reportsGeojson, map) {
    if (map.getLayer('reports')) {
      map.removeLayer('reports');
      map.removeSource('reports');
    }

    return new Promise((resolve, reject) => {
      const reports = {
        id: 'reports',
        type: 'circle',
        source: {
          type: 'geojson',
          data: reportsGeojson
        },
        paint: {
          'circle-color': '#31aade',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff'
        }
      };

      resolve(map.addLayer(reports));
    });
  }

  // range: {start: date_milliseconds, end: date_milliseconds}
  getReportsCount(map, range) {
    const reports = map.getSource('reports')._data.features;
    let reportsCount = 0;

    for (const report of reports) {
      if (report.properties.created_at >= range.start && report.properties.created_at <= range.end) {
        reportsCount += 1;
      }
    }

    return reportsCount;
  }

  loadFloodAreas(floodAreasGeojson, map) {
    return map.addLayer({
      id: 'flood_areas',
      type: 'fill',
      source: {
        type: 'geojson',
        data: floodAreasGeojson
      },
      filter: ['has', 'max_state'],
      paint: {
        'fill-color': {
          property: 'max_state',
          type: 'categorical',
          stops: [
            [1, '#a0a9f7'],
            [2, '#ffff00'],
            [3, '#ff8300'],
            [4, '#cc2a41']
          ]
        },
        'fill-opacity': 0.6,
        'fill-outline-color': '#000000'
      }
    });
  }

  updateFloodAreas(floodStates, floodAreas, map) {
    // Store floodAreas properties
    const updatedData = floodAreas;
    let floodAreasCount = 0;

    // Update floodAreas properties
    for (const area in floodAreas.features) {
      if (floodAreas.features[area]) {
        // Remove max_state property for all areas
        if (floodAreas.features[area].properties.hasOwnProperty('max_state')) {
          delete floodAreas.features[area].properties.max_state;
        }

        // Compare area_id's, add max_state property
        for (const state of floodStates) {
          if (floodAreas.features[area].properties.area_id === state.area_id) {
            updatedData.features[area].properties.max_state = parseInt(state.max_state, 10);
            floodAreasCount += 1;
          }
        }
      }
    }

    // Set updated data
    map.getSource('flood_areas')
    .setData(updatedData);

    return floodAreasCount;
  }

  filterLayer(map, layer, filter) {
    map.setFilter(layer, filter);
  }
}
