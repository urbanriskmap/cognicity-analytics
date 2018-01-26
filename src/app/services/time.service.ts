import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import 'moment/locale/id';

@Injectable()
export class TimeService {
  // Date picker limits
  dateLimits = {
    start: {
      min: moment([2016, 11, 9]), // Database launch date
      max: moment().tz('Asia/Jakarta').subtract(7, 'days')
    },
    end: {
      min: moment([2016, 11, 9]).add(7, 'days'),
      max: moment().tz('Asia/Jakarta') // Today's date
    }
  };

  // Date objects bound to datePickers
  startDate: moment;
  endDate: moment;

  // Date range object storing values as formatted strings for http queries
  selectedDateRange: {start: string, end: string};
  // Date-time object storing formatted values, bound to range slider
  selectedTimeframe: {start: string, end: string};

  reportParams = {
    timestampFormat: 'HH:mm DD MMM',
    start: null,
    end: null,
    lastUpdate: null,
    current: null
  };

  constructor() {
    // Set locale to Indonesian
    moment.locale('id');
    moment.tz.setDefault('Asia/Jakarta');

    this.setInitDates();
  }

  setInitDates(): void {
    this.endDate = moment().add(1, 'hour').minutes(0).seconds(0).milliseconds(0);
    this.startDate = this.getCorrespondingDate('start', this.endDate);
  }

  getCorrespondingDate(
    type: string,
    date: moment
  ): moment {
    if (type === 'start') {
      return moment(parseInt(date.format('x'), 10)).subtract(7, 'days');
    } else if (type === 'end') {
      return moment(parseInt(date.format('x'), 10)).add(7, 'days');
    }
  }

  formatTimestamp(reportsGeojson) {
    for (const report in reportsGeojson.features) {
      if (reportsGeojson.features[report]) {
        reportsGeojson.features[report].properties.created_at =
          moment(reportsGeojson.features[report].properties.created_at).format('x');
      }
    }
    return reportsGeojson;
  }

  getKnobDateTime(
    intervalHours: number,
    totalDays: number
  ): {
    timestamp: moment,
    mark: string
  }[] {
    const steps = totalDays * (24 / intervalHours);
    const millisecondsPerStep = intervalHours * 60 * 60 * 1000;
    const dateTimeMarks = [];

    for (let step = 0; step <= steps; step++) {
      const start = moment(parseInt(this.startDate.format('x'), 10))
        .minutes(0).seconds(0).milliseconds(0);
      if (start.hours() !== 0) {
        start.add(1, 'hour');
      }

      const timestamp = start.add(step * millisecondsPerStep, 'milliseconds');

      dateTimeMarks.push({
        timestamp: timestamp,
        mark: timestamp.format('HH:mm MMM DD')
      });
    }

    return dateTimeMarks;
  }

  updateDates(
    inputDate: string,
    date: moment,
    min: moment,
    max: moment
  ): void {
    if (date && date >= min && date <= max) {
      // Autofill corresponding date
      if (inputDate === 'start') {
        this.startDate = date;
        this.endDate = this.getCorrespondingDate('end', date);
      } else if (inputDate === 'end') {
        this.endDate = date;
        this.startDate = this.getCorrespondingDate('start', date);
      }
    } else {
      // Reset dates to init values
      this.setInitDates();
    }
  }

  setDateRange(
    isInitializing: boolean
  ): void {
    this.selectedDateRange = {
      start: this.startDate.utc().format().replace('.', '%2B'),
      end: this.endDate.utc().format().replace('.', '%2B')
    };

    if (isInitializing) {
      this.selectedTimeframe = this.selectedDateRange;
    }
  }

  updateTimeframe(
    start: moment,
    end: moment
  ): void {
    this.selectedTimeframe = {
      start: start.utc().format().replace('.', '%2B'),
      end: end.utc().format().replace('.', '%2B')
    };
  }

  getMilliseconds(date: string): number {
    return parseInt(moment(date).format('x'), 10);
  }

  setReportParams(lastUpdate) {
    this.reportParams.start = moment(
      this.selectedTimeframe.start.replace('%2B', '.')
    ).format(this.reportParams.timestampFormat);

    this.reportParams.end = moment(
      this.selectedTimeframe.end.replace('%2B', '.')
    ).format(this.reportParams.timestampFormat);

    if (lastUpdate === 'N/A') {
      this.reportParams.lastUpdate = lastUpdate;
    } else {
      this.reportParams.lastUpdate = moment(
        lastUpdate.replace('%2B', '.')
      ).format(this.reportParams.timestampFormat);
    }

    this.reportParams.current = moment().format(this.reportParams.timestampFormat);
  }
}
