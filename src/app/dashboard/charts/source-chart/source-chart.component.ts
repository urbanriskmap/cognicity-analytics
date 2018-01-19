import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-source-chart',
  templateUrl: './source-chart.component.html',
  styleUrls: ['./source-chart.component.scss']
})
export class SourceChartComponent implements OnInit, OnChanges {
  sourceChart: Chart;
  @Input() reportsSource: {aggregates: number[], labels: string[]};

  constructor() { }

  prepareCanvas() {
    $('#sourceCanvasWrapper').empty();
    $('#sourceCanvasWrapper').html(
      '<canvas id="sourceInset"></canvas>'
    );

    const chart_ctx = $('#sourceInset').get(0)['getContext']('2d');
    chart_ctx.canvas.width = $('#sourceCanvasWrapper').width();
    chart_ctx.canvas.height = $('#sourceCanvasWrapper').height();

    return chart_ctx;
  }

  ngOnInit() {
    const context = this.prepareCanvas();

    const chartSettings = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: this.reportsSource.aggregates,
          borderWidth: [1, 1, 1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(49, 170, 222, 0.7)',
            'rgba(255, 206, 86, 0.7)'
          ]
        }],
        labels: this.reportsSource.labels,
      },
      options: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            fontColor: '#d0d0d0',
            fontFamily: '"Roboto-Medium", "Roboto", "Open Sans"'
          }
        }
      }
    };

    this.sourceChart = new Chart(context, chartSettings);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('reportsSource')
    && changes.reportsSource.previousValue) {
      this.sourceChart.data.datasets[0].data = this.reportsSource.aggregates;
      this.sourceChart.update();
    }
  }
}
