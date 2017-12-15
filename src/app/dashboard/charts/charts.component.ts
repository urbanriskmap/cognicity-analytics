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
  reportsData: {t: string, y: number}[] = [];
  floodsData: {t: string, y: number}[] = [];
  chart: Chart;
  chartTypes = [
    {id: 'activity', title: 'Reporting activity', class: 'tabButton selected'},
    {id: 'source', title: 'Reporting source', class: 'tabButton'}
  ];
  selectedChart: string;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    for (const type of this.chartTypes) {
      if (type.class.indexOf('selected', 10) === 10) {
        this.selectedChart = type.id;
      }
    }
  }

  changeChart(e) {
    $('.tabButton').removeClass('selected');
    $('#' + e.srcElement.id).addClass('selected');
    this.selectedChart = e.srcElement.id.substring(0, e.srcElement.id.length - 6);

    // Use jQuery to show / hide, using *ngIf destroys component, & thus current graphics
    $('.charts:not(#' + this.selectedChart + 'Wrapper)').hide();
    $('#' + this.selectedChart + 'Wrapper').show();
  }

  prepareCanvas() {
    $('#activityWrapper').empty();
    $('#activityWrapper').html(
      '<canvas id="chartInset"></canvas>'
    );

    const chart_ctx = $('#chartInset').get(0)['getContext']('2d');
    chart_ctx.canvas.width = $('#activityWrapper').width();
    chart_ctx.canvas.height = $('#activityWrapper').height();

    return chart_ctx;
  }

  prepareData(timePeriod) {
    return new Promise((resolve, reject) => {
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

          resolve();
        })
        .catch(error => reject(error));
      })
      .catch(error => reject(error));
    });
  }

  drawChart(timePeriod) {
    const context = this.prepareCanvas();

    this.prepareData(timePeriod)
    .then(() => {
      this.chart = new Chart(context, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Reports count',
              xAxisId: 'x1',
              yAxisId: 'y1',
              borderWidth: 1,
              borderColor: '#31aade',
              pointRadius: 0,
              data: this.reportsData
            },
            {
              label: 'Flooded areas count',
              xAxisId: 'x1',
              yAxisId: 'y1',
              borderWidth: 1,
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
              fontColor: '#d0d0d0',
              fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
            }
          },
          scales: {
            yAxes: [{
              id: 'y1',
              type: 'linear',
              position: 'left',
              ticks: {
                fontColor: '#d0d0d0',
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
                fontColor: '#d0d0d0',
                fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
              }
            }],
          }
        }
      });
    })
    .catch(error => console.log(error));
  }

  updateChart(timePeriod) {
    this.reportsData = [];
    this.floodsData = [];
    if (this.chart.options.scales.xAxes[0].time.hasOwnProperty('min')) {
      delete this.chart.options.scales.xAxes[0].time.min;
      delete this.chart.options.scales.xAxes[0].time.max;
    }

    this.prepareData(timePeriod)
    .then(() => {
      this.chart.data.datasets[0].data = this.reportsData;
      this.chart.data.datasets[1].data = this.floodsData;
      this.chart.update();
    })
    .catch(error => console.log(error));
  }

  updateScale(range) {
    this.chart.options.scales.xAxes[0].time.min = range.upper.dateMilliseconds;
    this.chart.options.scales.xAxes[0].time.max = range.lower.dateMilliseconds;
    this.chart.update();
  }
}
