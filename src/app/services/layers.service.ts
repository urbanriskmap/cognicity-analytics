import { Injectable } from '@angular/core';

@Injectable()
export class LayersService {
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

  // range: {start: date_milliseconds, end: date_milliseconds}
  getReportsCount(map, range) {
    const reports = map.getSource('reports')._data.features;
    // Reset reports count by source to 0
    const reportsCount = {qlue: 0, grasp: 0, detik: 0};
    // Reset reports count by district to 0
    for (const district in this.districts) {
      if (this.districts[district]) {
        this.districts[district].reportsCount = 0;
        this.districts[district].minDepth = null;
        this.districts[district].maxDepth = null;
      }
    }

    for (const report of reports) {
      if (report.properties.created_at >= range.start && report.properties.created_at <= range.end) {
        // Increment total reports count
        reportsCount[report.properties.source] += 1;

        const districtId = report.properties.tags.district_id;

        if (districtId) {
          // Increment reports count by districts
          this.districts[districtId].reportsCount += 1;

          if (report.properties.report_data && report.properties.report_data.flood_depth) {
            // Update min depth by district
            if (this.districts[districtId].minDepth) {
              if (report.properties.report_data.flood_depth < this.districts[districtId].minDepth) {
                this.districts[districtId].minDepth = report.properties.report_data.flood_depth;
              }
            } else {
              this.districts[districtId].minDepth = report.properties.report_data.flood_depth;
            }

            // Update max depth by district
            if (this.districts[districtId].maxDepth) {
              if (report.properties.report_data.flood_depth > this.districts[districtId].maxDepth) {
                this.districts[districtId].maxDepth = report.properties.report_data.flood_depth;
              }
            } else {
              this.districts[districtId].maxDepth = report.properties.report_data.flood_depth;
            }
          }
        }
      }
    }

    return reportsCount;
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

  updateFloodAreas(floodStates, floodAreas, map) {
    // Store floodAreas properties
    const updatedData = floodAreas;
    let floodAreasCount = 0;
    // Reset areas count by district to 0
    for (const district in this.districts) {
      if (this.districts[district]) {
        this.districts[district].localAreaCount = 0;
        this.districts[district].parentAreaCount = 0;
        this.districts[district].parentAreaNames = [];
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
            updatedData.features[area].properties.max_state = parseInt(state.max_state, 10);
            floodAreasCount += 1;

            const parentAreaName = floodAreas.features[area].properties.parent_name;
            const districtId = floodAreas.features[area].properties.district_id;

            // Increment local area count
            this.districts[districtId].localAreaCount += 1;

            // Check if parentAreas array has current parent area
            if (this.districts[districtId].parentAreaNames.indexOf(parentAreaName) === -1) {
              // Parent name does not exist for current district
              // Increment parent area count
              this.districts[districtId].parentAreaCount += 1;
              // Push parent area name
              this.districts[districtId].parentAreaNames.push(parentAreaName);
            }
          }
        }
      }
    }

    // TODO: Pass this to report service
    console.log(this.districts);

    // Set updated data
    map.getSource('flood_areas')
    .setData(updatedData);

    return floodAreasCount;
  }

  filterLayer(map, layer, filter) {
    map.setFilter(layer, filter);
  }
}
