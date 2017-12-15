import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as topojson from 'topojson-client';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getFloodAreas(city) {
    const endpoint = environment.data_server + 'floods?city=' + city;

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

  getReportsArchive(timePeriod) {
    const endpoint = environment.data_server + 'reports/archive?start='
      + timePeriod.start + '&end='
      + timePeriod.end;

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

  getFloodAreasArchive(timePeriod) {
    const endpoint = environment.data_server + 'floods/archive?start='
      + timePeriod.start + '&end='
      + timePeriod.end;

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

  getTimeseries(dataType, timePeriod) {
    const endpoint = environment.data_server + dataType + '/timeseries?start='
      + timePeriod.start + '&end='
      + timePeriod.end;

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
}
