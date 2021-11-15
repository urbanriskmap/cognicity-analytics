import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import 'moment/locale/id';

import { environment as env } from '../../environments/environment';

@Injectable()
export class TimeService {
  dataAnalysis = [];
  // Date picker limits
  dateLimits = {
    start: {
      min: moment([2016, 11, 9]), // Database launch date
      max: moment().tz(env.timezones.tz).subtract(7, 'days')
    },
    end: {
      min: moment([2016, 11, 9]).add(7, 'days'),
      max: moment().tz(env.timezones.tz) // Today's date
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
    timestampFormat: 'HH:mm DD MMM YYYY',
    start: null,
    end: null,
    lastUpdate: null,
    current: null
  };

  constructor() {
    // Set locale to Indonesian
    moment.locale(env.timezones.locale);
    moment.tz.setDefault(env.timezones.tz);

    this.setInitDates();
  }

  cullSubHourUnits(timestamp: moment): moment {
    return timestamp.minutes(0).seconds(0).milliseconds(0);
  }

  getMilliseconds(date: string): number {
    return parseInt(moment(date).format('x'), 10);
  }

  setInitDates(): void {
    this.endDate = this.cullSubHourUnits(moment().add(1, 'hour'));
    this.startDate = this.getCorrespondingDate('start', this.endDate);
  }

  getCorrespondingDate(
    type: string,
    date: moment
  ): moment {
    if (type === 'start') {
      return moment(this.getMilliseconds(date)).subtract(7, 'days');
    } else if (type === 'end') {
      return moment(this.getMilliseconds(date)).add(7, 'days');
    }
  }

  formatTimestamp(reportsGeojson) {
    for (const report in reportsGeojson.features) {
      if (reportsGeojson.features[report]) {
        reportsGeojson.features[report].properties.created_at =
          this.getMilliseconds(reportsGeojson.features[report].properties.created_at);
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
      const start = this.cullSubHourUnits(
        moment(this.getMilliseconds(this.startDate))
      );
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
        this.startDate = this.cullSubHourUnits(date);
        this.endDate = this.getCorrespondingDate('end', date);
      } else if (inputDate === 'end') {
        this.endDate = this.cullSubHourUnits(date);
        this.startDate = this.getCorrespondingDate('start', date);
      }
    } else {
      // Reset dates to init values
      this.setInitDates();
    }

    this.updateTimeframe(this.startDate, this.endDate);
  }

  setDateRange(
    isInitializing: boolean
  ): void {
    const start = moment(this.startDate);
    const end = moment(this.endDate);

    this.selectedDateRange = {
      start: start.utc().format().replace('.', '%2B'),
      end: end.utc().format().replace('.', '%2B')
    };

    if (isInitializing) {
      this.selectedDateRange = {
        start: start.add(1, 'hour').utc().format().replace('.', '%2B'),
        end: end.add(1, 'hour').utc().format().replace('.', '%2B')
      };

      this.selectedTimeframe = this.selectedDateRange;
      this.dataAnalysis = [];
      this.makeDataTS();
    }
  }

  makeDataTS() {
    const start = moment(this.startDate);
    const end = moment(this.endDate);
    for (let i = 1; start <= end; i++) {
      this.dataAnalysis.push({ts: start.add(1, 'hour').utc().format().replace('.', '%2B'), count: 0})
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

  adjustTimezone(time: string) {
    // Get timezone offset for each timestamp, accounting for daylight saving times
    // Negative for +GMT, positive for -GMT
    const clientUtcOffset = (new Date(time)).getTimezoneOffset();

    // Add client utc offset to Asia/Jakarta utc offset
    const adjustmentMinutes = moment().utcOffset() + clientUtcOffset;
    return moment(time).add(adjustmentMinutes, 'minutes');
  }
}
