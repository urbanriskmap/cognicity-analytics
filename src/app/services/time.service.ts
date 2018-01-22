import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  // Get start & end dates in milliseconds
  // Return ISO 8601 format string compatible with data_server endpoint
  format(
    start: number,
    end: number
  ): {
    start: string,
    end: string
  } {
      // Generate ISO 8601 strings,
      // after generating UTC string to add time zone
      const startDatetime = (new Date(
        (new Date(start)).toUTCString()
      )).toISOString().replace('.', '%2B');
      const endDatetime = (new Date(
        (new Date(end)).toUTCString()
      )).toISOString().replace('.', '%2B');

      return {
        start: startDatetime.replace('Z', '0'),
        end: endDatetime.replace('Z', '0')
      };
  }

  formatTimestamp(reportsGeojson) {
    for (const report in reportsGeojson.features) {
      if (reportsGeojson.features[report]) {
        reportsGeojson.features[report].properties.created_at =
          Date.parse(reportsGeojson.features[report].properties.created_at);
      }
    }
    return reportsGeojson;
  }

  public getKnobDateTime(range, startDate): {
    dateMilliseconds: number,
    day: number,
    month: string,
    time: string
  }[] {
    const steps = range.totalDays * (24 / range.intervalHours);
    const millisecondsPerStep = range.intervalHours * 60 * 60 * 1000;
    const startMilliseconds = Date.parse((new Date(startDate.replace('%2B', '.'))).toString());
    const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateTimeMarks = [];

    for (let step = 0; step <= steps; step++) {
      const dateTime = new Date(startMilliseconds + (millisecondsPerStep * step));

      dateTimeMarks.push({
        dateMilliseconds: startMilliseconds + (millisecondsPerStep * step),
        day: dateTime.getDate(),
        month: monthMap[dateTime.getMonth()],
        time: (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours())
        + ':'
        + (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes())
      });
    }

    return dateTimeMarks;
  }
}
