import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.scss']
})
export class ActivityChartComponent implements OnInit, OnChanges {
  activityChart: Chart;
  @Input() reportsData: {t: string, y: number}[];
  @Input() floodsData: {t: string, y: number}[];
  @Input() scaleLimits: {max: number, min: number};

  constructor() { }

  prepareCanvas() {
    $('#activityCanvasWrapper').empty();
    $('#activityCanvasWrapper').html(
      '<canvas id="activityInset"></canvas>'
    );

    const chart_ctx = $('#activityInset').get(0)['getContext']('2d');
    chart_ctx.canvas.width = $('#activityCanvasWrapper').width();
    chart_ctx.canvas.height = $('#activityCanvasWrapper').height();

    return chart_ctx;
  }

  ngOnInit() {
    const context = this.prepareCanvas();

    const chartSettings = {
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
          },
          {
            id: 'x2',
            type: 'time',
            time: {
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                day: 'MMM D'
              }
            },
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            position: 'bottom',
            ticks: {
              autoSkip: true,
              autoSkipPadding: 12,
              fontColor: '#d0d0d0',
              fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
            }
          }
        ],
        }
      }
    };

    this.activityChart = new Chart(context, chartSettings);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('scaleLimits')) {
      if (changes.scaleLimits.currentValue && this.activityChart) {
        this.activityChart.options.scales.xAxes[0].time.min = this.scaleLimits.min;
        this.activityChart.options.scales.xAxes[0].time.max = this.scaleLimits.max;
        this.activityChart.update();
      }
    }
  }
}
