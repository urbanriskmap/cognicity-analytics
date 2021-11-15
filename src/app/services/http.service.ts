import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as topojson from 'topojson-client';
import { TimeService } from './time.service';
import { data } from 'jquery/dist/jquery.slim';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private timeservice: TimeService) { }

  getFloodAreas(city: string): Promise<{
    type: string,
    features: {
      type: string,
      geometry: {
        type: string,
        coordinates: number[]
      },
      properties: object
    }[]
  }> {
    const endpoint = environment.data_server + 'floods?admin=' + city;

    return new Promise((resolve, reject) => {
      this.http
      .get(endpoint)
      .subscribe(response => {
        if (response['statusCode'] === 200) {
          const topojsonData = response['result'];
          if (topojsonData && topojsonData.objects) {
            const geojsonData = topojson.feature(topojsonData, topojsonData.objects.output);
            resolve(geojsonData);
          }
        } else {
          reject(response);
        }
      });
    });
  }

  getReportsArchive(timePeriod: {
    start: string,
    end: string
  }, region: string): Promise<{
    type: string,
    features: {
      type: string,
      geometry: {
        type: string,
        coordinates: number[]
      },
      properties: object
    }[]
  }> {
    const endpoint = environment.data_server + 'reports/archive?start='
      + timePeriod.start + '&end='
      + timePeriod.end + '&admin='
      + region;

    return new Promise((resolve, reject) => {
      this.http
      .get(endpoint)
      .subscribe(response => {
        if (response['statusCode'] === 200) {
          const topojsonData = response['result'];
          if (topojsonData && topojsonData.objects) {
            const geojsonData = topojson.feature(topojsonData, topojsonData.objects.output);
            resolve(geojsonData);
          }
        } else {
          reject(response);
        }
      });
    });
  }

  getFloodAreasArchive(timePeriod: {
    start: string,
    end: string
  }): Promise<{
    area_id: string,
    last_updated: string,
    max_state: number
  }[]> {
    const endpoint = environment.data_server + 'floods/archive?start='
      + timePeriod.start + '&end='
      + timePeriod.end + '&admin='
      + environment.instance_region[12];

    return new Promise((resolve, reject) => {
      this.http
      .get(endpoint)
      .subscribe(response => {
        if (response['statusCode'] === 200) {
          resolve(response['result']);
        } else {
          reject(response);
        }
      });
    });
  }

  getTimeseries(
    dataType: string,
    timePeriod: {
      start: string,
      end: string
    }): Promise<{
      ts: string,
      count: number
    }[]> {
    const endpoint = environment.data_server + dataType + '/timeseries?start='
      + timePeriod.start + '&end='
      + timePeriod.end + '&admin='
      + environment.instance_region[12];

    return new Promise((resolve, reject) => {
      this.http
      .get(endpoint)
      .subscribe(response => {
        if (response['statusCode'] === 200) {
          resolve(response['result']);
        } else {
          reject(response);
        }
      });
    });
  }

  getJakartaTimeseries(
    timePeriod: {
      start: string,
      end: string
    }): Promise<{
      ts: string,
      count: number
    }[]> {
    const endpoint = environment.data_server + 'reports/archive?start='
      + timePeriod.start + '&end='
      + timePeriod.end + '&admin='
      + environment.instance_region[12];

    return new Promise((resolve, reject) => {
      this.http
      .get(endpoint)
      .subscribe(response => {
        if (response['statusCode'] === 200) {
          const topojsonData = response['result'];
          if (topojsonData && topojsonData.objects) {
            const geojsonData = topojson.feature(topojsonData, topojsonData.objects.output);
            const dataTS = this.timeservice.dataAnalysis
            for (let i = 0; i < dataTS.length-1; i++) {
              for (const data of geojsonData.features) {
                if (data.properties.created_at >= dataTS[i].ts && data.properties.created_at < dataTS[(i+1)%dataTS.length].ts) {
                  dataTS[i].count += 1
                }
              }
            }
            resolve(dataTS);
          }
        } else {
          reject(response);
        }
      });
    });
  }
}
