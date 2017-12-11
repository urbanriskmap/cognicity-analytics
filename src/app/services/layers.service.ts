import { Injectable } from '@angular/core';

@Injectable()
export class LayersService {

  constructor() { }

  renderReports(reportsGeojson, map) {
    if (map.getLayer('reports')) {
      map.removeLayer('reports');
      map.removeSource('reports');
    }
    return map.addLayer({
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
    });
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
        'fill-opacity': 0.7,
        'fill-outline-color': '#000000'
      }
    });
  }

  updateFloodAreas(floodStates, floodAreas, map) {
    // Reset flood areas data
    map.getSource('flood_areas')
    .setData(floodAreas);

    const updatedData = floodAreas;

    for (const area in floodAreas.features) {
      if (floodAreas.features[area]) {
        for (const state of floodStates) {
          if (floodAreas.features[area].properties.area_id === state.area_id) {
            updatedData.features[area].properties.max_state = parseInt(state.max_state, 10);
          }
        }
      }
    }

    // Set updated data
    map.getSource('flood_areas')
    .setData(updatedData);
  }
}
