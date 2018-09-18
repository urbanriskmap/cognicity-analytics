/* tslint:disable */
import * as topojson from 'topojson-client';
import mockAdCreatives from './mock-ad-creatives';
import floodedAreas from './mock-ad-creatives';

export class MockHttpService { 
  constructor() {}

  getAllAdCreatives() {
    return new Promise((res, rej) => {
      res(mockAdCreatives.ads);
    });
  }

  submitAdForApproval(ad: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

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

    return new Promise((resolve, reject) => {
      const topojsonData = floodedAreas['result'];
          if (topojsonData && topojsonData.objects) {
            const geojsonData = topojson.feature(topojsonData, topojsonData.objects.output);
            resolve(geojsonData);
          }
    });
  }

    getReportsArchive(timePeriod: {
      start: string,
      end: string
    }): Promise<{
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

      /* tslint:disable */
      const mockData = {"statusCode":200,"result":{"type":"Topology","objects":{"output":{"type":"GeometryCollection","geometries":[{"type":"Point","properties":{"pkey":"9567","created_at":"2018-09-08T05:37:00.000Z","source":"qlue","status":"confirmed","url":null,"image_url":"https://lh3.googleusercontent.com/MPU0yn0nersdaN6YAGa6quW-3jrpSVBqnnGvBEwKQ4XGX3AomfC_blM_ivS8zIbyEirzKO66V6DbIZ0fFBTezFPtanFK=s480-c","disaster_type":"flood","report_data":null,"tags":{"district_id":null,"local_area_id":"606","instance_region_code":"jbd"},"title":"","text":"sudah seminggu air tergenang di kolong jembatan dekat Gandhi School Kemayoran... kemana nih dinas terkait yang tugasnya menyedot air..."},"coordinates":[106.853302,-6.152981]},{"type":"Point","properties":{"pkey":"9545","created_at":"2018-09-06T13:09:00.000Z","source":"qlue","status":"confirmed","url":null,"image_url":"https://lh3.googleusercontent.com/7rh35MC13kUFKDvcp6Xpj0Gxmz4DPas2_2zIr5p1V8Smri_WsYlDF_7oDc1uQHqyY5qztE0mgz4o-uO_L4Kphl7R8l4=s480-c","disaster_type":"flood","report_data":null,"tags":{"district_id":null,"local_area_id":"1698","instance_region_code":"jbd"},"title":"","text":"saluran terhsmbat.Benahi ya.Dlm peduli"},"coordinates":[106.883026,-6.122062]},{"type":"Point","properties":{"pkey":"9543","created_at":"2018-09-06T13:08:00.000Z","source":"qlue","status":"confirmed","url":null,"image_url":"https://lh3.googleusercontent.com/7_mCUldsECP_JKnx71JrDt2Fikgh7_0dbBNhjhcOkZcss-rS6Bx5BS7TCd6RrdG27457azF_crqMvGhK88OWYoel6t-M=s480-c","disaster_type":"flood","report_data":null,"tags":{"district_id":null,"local_area_id":"1698","instance_region_code":"jbd"},"title":"","text":"benahi ya Slm peduli"},"coordinates":[106.883011,-6.122165]},{"type":"Point","properties":{"pkey":"9531","created_at":"2018-09-06T07:02:00.000Z","source":"qlue","status":"confirmed","url":null,"image_url":"https://lh3.googleusercontent.com/ahtQ3sgKiifnofUrZJIg-sLT5SvOvTy7pioSx3ye5wkENiemvImoAcyD7tywnDqWtBP3x1WZKUS2M9T5--9I3iF1uc3o=s480-c","disaster_type":"flood","report_data":null,"tags":{"district_id":null,"local_area_id":"2478","instance_region_code":"jbd"},"title":"","text":"Got banyak sampah plastik \ndimohon dibersihkan \n#got"},"coordinates":[106.843582,-6.264583]},{"type":"Point","properties":{"pkey":"9520","created_at":"2018-09-06T00:20:00.000Z","source":"qlue","status":"confirmed","url":null,"image_url":"https://lh3.googleusercontent.com/DQd0w2pBQIbnyUIKiY1wV4_rq0iShS7Bu1AR1nEp00ydhIrNKAy42LFDhnOtSGq8tNqnYnW4_xONDH1OySERg089-3cG=s480-c","disaster_type":"flood","report_data":null,"tags":{"district_id":null,"local_area_id":"606","instance_region_code":"jbd"},"title":"","text":"Pompa Terowongan  kemayoran dr Springhill ke arah Masjid Akbar Kemayoran deket Wisma Atlit tidak berfungsi. Kami terganngu aktifitas nya padahal hujan hanya turun 5 menit tapi air tak juga di sedot padahal sudah 2 hari semenjak hujan tp tidak ada tanggapan pihak terkait. mohon Responnya"},"coordinates":[106.853073,-6.15327]}]}},"arcs":[],"bbox":[106.843582,-6.264583,106.883026,-6.122062]}};
      /* tslint:enable */
  
      return new Promise((resolve, reject) => {
        const topojsonData = mockData['result'];
        if (topojsonData && topojsonData.objects) {
          const geojsonData = topojson.feature(topojsonData, topojsonData.objects.output);
          resolve(geojsonData);
        }
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
      const mockData = {"statusCode":200,"result":[{"area_id":"817","last_updated":"2018-08-16T03:50:01.601Z","max_state":3},{"area_id":"873","last_updated":"2018-08-16T03:50:31.581Z","max_state":1},{"area_id":"896","last_updated":"2018-08-16T03:48:15.424Z","max_state":3},{"area_id":"897","last_updated":"2018-08-16T03:48:29.788Z","max_state":2},{"area_id":"907","last_updated":"2018-08-16T03:50:35.753Z","max_state":1},{"area_id":"927","last_updated":"2018-08-16T03:48:04.697Z","max_state":2},{"area_id":"936","last_updated":"2018-08-16T03:47:52.141Z","max_state":4},{"area_id":"2626","last_updated":"2018-08-16T03:49:50.241Z","max_state":2}]};
  
      return new Promise((resolve, reject) => {
        resolve(mockData['result']);
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

      let mockData = {"statusCode":200,"result":[{"ts":"2018-09-05T18:00:00.000Z","count":"0"},{"ts":"2018-09-05T19:00:00.000Z","count":"0"},{"ts":"2018-09-05T20:00:00.000Z","count":"0"},{"ts":"2018-09-05T21:00:00.000Z","count":"0"},{"ts":"2018-09-05T22:00:00.000Z","count":"0"},{"ts":"2018-09-05T23:00:00.000Z","count":"0"},{"ts":"2018-09-06T00:00:00.000Z","count":"1"},{"ts":"2018-09-06T01:00:00.000Z","count":"0"},{"ts":"2018-09-06T02:00:00.000Z","count":"0"},{"ts":"2018-09-06T03:00:00.000Z","count":"0"},{"ts":"2018-09-06T04:00:00.000Z","count":"0"},{"ts":"2018-09-06T05:00:00.000Z","count":"0"},{"ts":"2018-09-06T06:00:00.000Z","count":"0"},{"ts":"2018-09-06T07:00:00.000Z","count":"1"},{"ts":"2018-09-06T08:00:00.000Z","count":"0"},{"ts":"2018-09-06T09:00:00.000Z","count":"0"},{"ts":"2018-09-06T10:00:00.000Z","count":"0"},{"ts":"2018-09-06T11:00:00.000Z","count":"0"},{"ts":"2018-09-06T12:00:00.000Z","count":"0"},{"ts":"2018-09-06T13:00:00.000Z","count":"2"},{"ts":"2018-09-06T14:00:00.000Z","count":"0"},{"ts":"2018-09-06T15:00:00.000Z","count":"0"},{"ts":"2018-09-06T16:00:00.000Z","count":"0"},{"ts":"2018-09-06T17:00:00.000Z","count":"0"},{"ts":"2018-09-06T18:00:00.000Z","count":"0"},{"ts":"2018-09-06T19:00:00.000Z","count":"0"},{"ts":"2018-09-06T20:00:00.000Z","count":"0"},{"ts":"2018-09-06T21:00:00.000Z","count":"0"},{"ts":"2018-09-06T22:00:00.000Z","count":"0"},{"ts":"2018-09-06T23:00:00.000Z","count":"0"},{"ts":"2018-09-07T00:00:00.000Z","count":"0"},{"ts":"2018-09-07T01:00:00.000Z","count":"0"},{"ts":"2018-09-07T02:00:00.000Z","count":"0"},{"ts":"2018-09-07T03:00:00.000Z","count":"0"},{"ts":"2018-09-07T04:00:00.000Z","count":"0"},{"ts":"2018-09-07T05:00:00.000Z","count":"0"},{"ts":"2018-09-07T06:00:00.000Z","count":"0"},{"ts":"2018-09-07T07:00:00.000Z","count":"0"},{"ts":"2018-09-07T08:00:00.000Z","count":"0"},{"ts":"2018-09-07T09:00:00.000Z","count":"0"},{"ts":"2018-09-07T10:00:00.000Z","count":"0"},{"ts":"2018-09-07T11:00:00.000Z","count":"0"},{"ts":"2018-09-07T12:00:00.000Z","count":"0"},{"ts":"2018-09-07T13:00:00.000Z","count":"0"},{"ts":"2018-09-07T14:00:00.000Z","count":"0"},{"ts":"2018-09-07T15:00:00.000Z","count":"0"},{"ts":"2018-09-07T16:00:00.000Z","count":"0"},{"ts":"2018-09-07T17:00:00.000Z","count":"0"},{"ts":"2018-09-07T18:00:00.000Z","count":"0"},{"ts":"2018-09-07T19:00:00.000Z","count":"0"},{"ts":"2018-09-07T20:00:00.000Z","count":"0"},{"ts":"2018-09-07T21:00:00.000Z","count":"0"},{"ts":"2018-09-07T22:00:00.000Z","count":"0"},{"ts":"2018-09-07T23:00:00.000Z","count":"0"},{"ts":"2018-09-08T00:00:00.000Z","count":"0"},{"ts":"2018-09-08T01:00:00.000Z","count":"0"},{"ts":"2018-09-08T02:00:00.000Z","count":"0"},{"ts":"2018-09-08T03:00:00.000Z","count":"0"},{"ts":"2018-09-08T04:00:00.000Z","count":"0"},{"ts":"2018-09-08T05:00:00.000Z","count":"1"},{"ts":"2018-09-08T06:00:00.000Z","count":"0"},{"ts":"2018-09-08T07:00:00.000Z","count":"0"},{"ts":"2018-09-08T08:00:00.000Z","count":"0"},{"ts":"2018-09-08T09:00:00.000Z","count":"0"},{"ts":"2018-09-08T10:00:00.000Z","count":"0"},{"ts":"2018-09-08T11:00:00.000Z","count":"0"},{"ts":"2018-09-08T12:00:00.000Z","count":"0"},{"ts":"2018-09-08T13:00:00.000Z","count":"0"},{"ts":"2018-09-08T14:00:00.000Z","count":"0"},{"ts":"2018-09-08T15:00:00.000Z","count":"0"},{"ts":"2018-09-08T16:00:00.000Z","count":"0"},{"ts":"2018-09-08T17:00:00.000Z","count":"0"},{"ts":"2018-09-08T18:00:00.000Z","count":"0"},{"ts":"2018-09-08T19:00:00.000Z","count":"0"},{"ts":"2018-09-08T20:00:00.000Z","count":"0"},{"ts":"2018-09-08T21:00:00.000Z","count":"0"},{"ts":"2018-09-08T22:00:00.000Z","count":"0"},{"ts":"2018-09-08T23:00:00.000Z","count":"0"},{"ts":"2018-09-09T00:00:00.000Z","count":"0"},{"ts":"2018-09-09T01:00:00.000Z","count":"0"},{"ts":"2018-09-09T02:00:00.000Z","count":"0"},{"ts":"2018-09-09T03:00:00.000Z","count":"0"},{"ts":"2018-09-09T04:00:00.000Z","count":"0"},{"ts":"2018-09-09T05:00:00.000Z","count":"0"},{"ts":"2018-09-09T06:00:00.000Z","count":"0"},{"ts":"2018-09-09T07:00:00.000Z","count":"0"},{"ts":"2018-09-09T08:00:00.000Z","count":"0"},{"ts":"2018-09-09T09:00:00.000Z","count":"0"},{"ts":"2018-09-09T10:00:00.000Z","count":"0"},{"ts":"2018-09-09T11:00:00.000Z","count":"0"},{"ts":"2018-09-09T12:00:00.000Z","count":"0"},{"ts":"2018-09-09T13:00:00.000Z","count":"0"},{"ts":"2018-09-09T14:00:00.000Z","count":"0"},{"ts":"2018-09-09T15:00:00.000Z","count":"0"},{"ts":"2018-09-09T16:00:00.000Z","count":"0"},{"ts":"2018-09-09T17:00:00.000Z","count":"0"},{"ts":"2018-09-09T18:00:00.000Z","count":"0"},{"ts":"2018-09-09T19:00:00.000Z","count":"0"},{"ts":"2018-09-09T20:00:00.000Z","count":"0"},{"ts":"2018-09-09T21:00:00.000Z","count":"0"},{"ts":"2018-09-09T22:00:00.000Z","count":"0"},{"ts":"2018-09-09T23:00:00.000Z","count":"0"},{"ts":"2018-09-10T00:00:00.000Z","count":"0"},{"ts":"2018-09-10T01:00:00.000Z","count":"0"},{"ts":"2018-09-10T02:00:00.000Z","count":"0"},{"ts":"2018-09-10T03:00:00.000Z","count":"0"},{"ts":"2018-09-10T04:00:00.000Z","count":"0"},{"ts":"2018-09-10T05:00:00.000Z","count":"0"},{"ts":"2018-09-10T06:00:00.000Z","count":"0"},{"ts":"2018-09-10T07:00:00.000Z","count":"0"},{"ts":"2018-09-10T08:00:00.000Z","count":"0"},{"ts":"2018-09-10T09:00:00.000Z","count":"0"},{"ts":"2018-09-10T10:00:00.000Z","count":"0"},{"ts":"2018-09-10T11:00:00.000Z","count":"0"},{"ts":"2018-09-10T12:00:00.000Z","count":"0"},{"ts":"2018-09-10T13:00:00.000Z","count":"0"},{"ts":"2018-09-10T14:00:00.000Z","count":"0"},{"ts":"2018-09-10T15:00:00.000Z","count":"0"},{"ts":"2018-09-10T16:00:00.000Z","count":"0"},{"ts":"2018-09-10T17:00:00.000Z","count":"0"},{"ts":"2018-09-10T18:00:00.000Z","count":"0"},{"ts":"2018-09-10T19:00:00.000Z","count":"0"},{"ts":"2018-09-10T20:00:00.000Z","count":"0"},{"ts":"2018-09-10T21:00:00.000Z","count":"0"},{"ts":"2018-09-10T22:00:00.000Z","count":"0"},{"ts":"2018-09-10T23:00:00.000Z","count":"0"},{"ts":"2018-09-11T00:00:00.000Z","count":"0"},{"ts":"2018-09-11T01:00:00.000Z","count":"0"},{"ts":"2018-09-11T02:00:00.000Z","count":"0"},{"ts":"2018-09-11T03:00:00.000Z","count":"0"},{"ts":"2018-09-11T04:00:00.000Z","count":"0"},{"ts":"2018-09-11T05:00:00.000Z","count":"0"},{"ts":"2018-09-11T06:00:00.000Z","count":"0"},{"ts":"2018-09-11T07:00:00.000Z","count":"0"},{"ts":"2018-09-11T08:00:00.000Z","count":"0"},{"ts":"2018-09-11T09:00:00.000Z","count":"0"},{"ts":"2018-09-11T10:00:00.000Z","count":"0"},{"ts":"2018-09-11T11:00:00.000Z","count":"0"},{"ts":"2018-09-11T12:00:00.000Z","count":"0"},{"ts":"2018-09-11T13:00:00.000Z","count":"0"},{"ts":"2018-09-11T14:00:00.000Z","count":"0"},{"ts":"2018-09-11T15:00:00.000Z","count":"0"},{"ts":"2018-09-11T16:00:00.000Z","count":"0"},{"ts":"2018-09-11T17:00:00.000Z","count":"0"},{"ts":"2018-09-11T18:00:00.000Z","count":"0"},{"ts":"2018-09-11T19:00:00.000Z","count":"0"},{"ts":"2018-09-11T20:00:00.000Z","count":"0"},{"ts":"2018-09-11T21:00:00.000Z","count":"0"},{"ts":"2018-09-11T22:00:00.000Z","count":"0"},{"ts":"2018-09-11T23:00:00.000Z","count":"0"},{"ts":"2018-09-12T00:00:00.000Z","count":"0"},{"ts":"2018-09-12T01:00:00.000Z","count":"0"},{"ts":"2018-09-12T02:00:00.000Z","count":"0"},{"ts":"2018-09-12T03:00:00.000Z","count":"0"},{"ts":"2018-09-12T04:00:00.000Z","count":"0"},{"ts":"2018-09-12T05:00:00.000Z","count":"0"},{"ts":"2018-09-12T06:00:00.000Z","count":"0"},{"ts":"2018-09-12T07:00:00.000Z","count":"0"},{"ts":"2018-09-12T08:00:00.000Z","count":"0"},{"ts":"2018-09-12T09:00:00.000Z","count":"0"},{"ts":"2018-09-12T10:00:00.000Z","count":"0"},{"ts":"2018-09-12T11:00:00.000Z","count":"0"},{"ts":"2018-09-12T12:00:00.000Z","count":"0"},{"ts":"2018-09-12T13:00:00.000Z","count":"0"},{"ts":"2018-09-12T14:00:00.000Z","count":"0"},{"ts":"2018-09-12T15:00:00.000Z","count":"0"},{"ts":"2018-09-12T16:00:00.000Z","count":"0"},{"ts":"2018-09-12T17:00:00.000Z","count":"0"},{"ts":"2018-09-12T18:00:00.000Z","count":"0"}]};
      let ret = [];
      for (let res of mockData['result']) {
        ret.push(res.ts, Number(res.count));
      }
  
      return new Promise((resolve, reject) => {
        resolve(ret);
      });
    }
}
/* tslint:enable */
