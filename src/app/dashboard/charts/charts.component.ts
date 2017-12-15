import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpService } from '../../services/http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnInit {
  @Input() someValue: number;
  @Input() otherValue: number;
  // reportsData: {t: string, y: number}[];
  // floodsData: {t: string, y: number}[];
  reportsData: {t: string, y: number}[] = [];
  floodsData: {t: string, y: number}[] = [];
  chart: Chart;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  prepareData(timePeriod) {
    return new Promise((resolve, reject) => {
      $('#chartWrapper').empty();
      $('#chartWrapper').html(
        '<canvas id="chartInset"></canvas>'
      );

      const chart_ctx = $('#chartInset').get(0).getContext('2d');
      chart_ctx.canvas.width = $('#chartWrapper').width();
      chart_ctx.canvas.height = $('#chartWrapper').height();

      this.httpService.getTimeseries('reports', timePeriod)
      .then(reports => {
        this.httpService.getTimeseries('floods', timePeriod)
        .then(floods => {
          for (const report of reports) {
            this.reportsData.push({
              t: report.ts,
              y: report.count
            });
          }

          for (const area of floods) {
            this.floodsData.push({
              t: area.ts,
              y: area.count
            });
          }

          resolve(chart_ctx);
        })
        .catch(error => reject(error));
      })
      .catch(error => reject(error));
    });
  }

  drawChart(timePeriod) {
    this.prepareData(timePeriod)
    .then(context => {
      this.chart = new Chart(context, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Reports count',
              xAxisId: 'x1',
              yAxisId: 'y1',
              borderWidth: 0.8,
              borderColor: '#31aade',
              pointRadius: 0,
              data: this.reportsData
            },
            {
              label: 'Flooded areas count',
              xAxisId: 'x1',
              yAxisId: 'y1',
              borderWidth: 0.8,
              borderColor: '#c1272d',
              pointRadius: 0,
              data: this.floodsData
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: false
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: '#404040',
              fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
            }
          },
          scales: {
            yAxes: [{
              id: 'y1',
              type: 'linear',
              position: 'left',
              ticks: {
                fontColor: '#404040',
                fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
              }
            }],
            xAxes: [{
              id: 'x1',
              type: 'time',
              time: {
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                  hour: 'HH:mm'
                }
              },
              position: 'bottom',
              ticks: {
                autoSkip: true,
                autoSkipPadding: 12,
                fontColor: '#404040',
                fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
              }
            }],
          }
        }
      });
    })
    .catch(error => console.log(error));
  }

  updateChart(event) {
    // console.log(event);
  }
}
