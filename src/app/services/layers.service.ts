import { Injectable } from '@angular/core';

@Injectable()
export class LayersService {

  constructor() { }

  renderReports(reportsGeojson, map) {
    if (map.getLayer('reports')) {
      map.removeLayer('reports');
      map.removeSource('reports');
    }

    const reports = {
      id: 'reports',
      type: 'circle',
      source: {
        type: 'geojson',
        data: reportsGeojson
      },
      paint: {
        'circle-color': [
          'match', 
          ['get', 'disaster_type'],
          'flood',
          'Aqua',
          'earthquake',
          'SaddleBrown',
          'wind',
          'PaleGreen',
          'haze',
          'SlateGrey',
          'fire',
          'DarkOrange',
          'volcano',
          'Red',
          'white'
        ],
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'Gray'
      }
    };

    return new Promise(resolve => {
      resolve(map.addLayer(reports));
    });
  }


  getReportsCount(map, {start, end}, districts): {
    aggregates: {
      qlue: number,
      grasp: number,
      detik: number
    },
    districts: any
  } {
    const reports = map.getSource('reports')._data.features;
    // Reset reports count by source to 0
    const reportsCount = {qlue: 0, grasp: 0, detik: 0};
    // Reset reports count by district to 0
    for (const district in districts) {
      if (districts[district]) {
        districts[district].reportsCount = 0;
      }
    }

    for (const report of reports) {
      if (report.properties.created_at >= start && report.properties.created_at <= end) {
        // Increment total reports count
        reportsCount[report.properties.source] += 1;

        const districtId = report.properties.tags.district_id;
        if (districtId) {
          const currentDistrict = districts[districtId];
          // Increment reports count by districts
          currentDistrict.reportsCount += 1;
        }
      }
    }

    return {
      aggregates: reportsCount,
      districts: districts
    };
  }

  getDisasterCount(map, {start, end}, region): {
    aggregates: {
      flood: number,
      earthquake: number,
      wind: number,
      haze: number,
      fire: number,
      volcano: number,
      total: number
    }
  } {
    const reports = map.getSource('reports')._data.features;
    // Reset reports count by source to 0
    const reportsCount = {flood: 0, earthquake: 0, wind: 0, haze: 0, fire: 0, volcano: 0, total: 0};
    // Reset reports count by district to 0
    
    for (const report of reports) {
      if (report.properties.created_at >= start && report.properties.created_at <= end && report.properties.tags.instance_region_code == region) {
        // Increment total reports count
        reportsCount[report.properties.disaster_type] += 1;
        reportsCount.total += 1;
      }
    }
    return {
      aggregates: reportsCount
    };
  }

  loadFloodAreas(floodAreasGeojson, map) {
    const floodAreas = {
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
    };

    return new Promise(resolve => {
      resolve(map.addLayer(floodAreas));
    });
  }


  updateFloodAreas(floodStates, floodAreas, map, districts): {
    total: number,
    districts: any,
    lastUpdate: string
  } {
    // Store floodAreas properties
    const updatedData = floodAreas;
    let lastUpdate = null;
    let floodAreasCount = 0;
    // Reset areas count by district to 0
    for (const district in districts) {
      if (districts[district]) {
        districts[district].parentAreasCount = 0;
        districts[district].parentAreas = {};
      }
    }

    // Update floodAreas properties
    for (const area in floodAreas.features) {
      if (floodAreas.features[area]) {
        // Remove max_state property for all areas
        if (floodAreas.features[area].properties.hasOwnProperty('max_state')) {
          delete floodAreas.features[area].properties.max_state;
        }

        // Compare area_id's, add max_state property
        for (const state of floodStates) {
          const localAreaId = floodAreas.features[area].properties.area_id;

          if (localAreaId === state.area_id) {
            const maxState = parseInt(state.max_state, 10);
            updatedData.features[area].properties.max_state = maxState;
            floodAreasCount += 1;

            // Collect, compare and store lastUpdate property
            if (lastUpdate) {
              if (new Date(state.last_updated) > lastUpdate) {
                lastUpdate = new Date(state.last_updated);
              }
            } else {
              lastUpdate = new Date(state.last_updated);
            }

            const localAreaName = floodAreas.features[area].properties.area_name;
            const parentAreaName = floodAreas.features[area].properties.parent_name;
            const districtId = floodAreas.features[area].properties.attributes.district_id;
            const currentDistrict = districts[districtId];

            // Check for existing parent area
            if (!currentDistrict.parentAreas.hasOwnProperty(parentAreaName)) {
              // Incement parent areas count
              currentDistrict.parentAreasCount += 1;
              currentDistrict.parentAreas[parentAreaName] = {name: parentAreaName, localAreas: []};
            }

            // Register local area info against parent area
            currentDistrict.parentAreas[parentAreaName].localAreas.push({
              name: localAreaName,
              maxState: maxState
            });
          }
        }
      }
    }

    // Set updated data
    map.getSource('flood_areas')
    .setData(updatedData);

    return {
      total: floodAreasCount,
      districts: districts,
      lastUpdate: lastUpdate ? lastUpdate.toISOString().replace('.', '%2B') : 'N/A'
    };
  }

  filterLayer(map, layer, filter) {
    map.setFilter(layer, filter);
  }
}
