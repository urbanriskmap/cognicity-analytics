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
        'circle-color': '#31aade',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ffffff'
      }
    };

    return new Promise(resolve => {
      resolve(map.addLayer(reports));
    });
  }


  getReportsCount(map, {start, end}, districts): Promise<{
    aggregates: {
      qlue: number,
      grasp: number,
      detik: number
    },
    districts: any
  }> {
    return new Promise(resolve => {
      const reports = map.getSource('reports')._data.features;
      // Reset reports count by source to 0
      const reportsCount = {qlue: 0, grasp: 0, detik: 0};
      // Reset reports count by district to 0
      for (const district in districts) {
        if (districts[district]) {
          districts[district].reportsCount = 0;
          districts[district].minDepth = null;
          districts[district].maxDepth = null;
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

            if (report.properties.report_data && report.properties.report_data.flood_depth) {
              // Update min depth by district
              if (currentDistrict.minDepth) {
                if (report.properties.report_data.flood_depth < currentDistrict.minDepth) {
                  currentDistrict.minDepth = report.properties.report_data.flood_depth;
                }
              } else {
                currentDistrict.minDepth = report.properties.report_data.flood_depth;
              }

              // Update max depth by district
              if (currentDistrict.maxDepth) {
                if (report.properties.report_data.flood_depth > currentDistrict.maxDepth) {
                  currentDistrict.maxDepth = report.properties.report_data.flood_depth;
                }
              } else {
                currentDistrict.maxDepth = report.properties.report_data.flood_depth;
              }
            }
          }
        }
      }

      resolve({
        aggregates: reportsCount,
        districts: districts
      });
    });
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


  updateFloodAreas(floodStates, floodAreas, map, districts): Promise<{
    total: number,
    districts: any
  }> {
    return new Promise(resolve => {
      // Store floodAreas properties
      const updatedData = floodAreas;
      let floodAreasCount = 0;
      // Reset areas count by district to 0
      for (const district in districts) {
        if (districts[district]) {
          districts[district].localAreaCount = 0;
          districts[district].parentAreaCount = 0;
          districts[district].parentAreaNames = [];
        }
      }

      // TODO: Extract & pass RW last update stamp (for all data)

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
              updatedData.features[area].properties.max_state = parseInt(state.max_state, 10);
              floodAreasCount += 1;

              const parentAreaName = floodAreas.features[area].properties.parent_name;
              const districtId = floodAreas.features[area].properties.district_id;
              const currentDistrict = districts[districtId];

              // Increment local area count
              currentDistrict.localAreaCount += 1;

              // Check if parentAreas array has current parent area
              if (currentDistrict.parentAreaNames.indexOf(parentAreaName) === -1) {
                // Parent name does not exist for current district
                // Increment parent area count
                currentDistrict.parentAreaCount += 1;
                // Push parent area name
                currentDistrict.parentAreaNames.push(parentAreaName);
              }
            }
          }
        }
      }

      // Set updated data
      map.getSource('flood_areas')
      .setData(updatedData);

      resolve({
        total: floodAreasCount,
        districts: districts
      });
    });
  }

  filterLayer(map, layer, filter) {
    map.setFilter(layer, filter);
  }
}
