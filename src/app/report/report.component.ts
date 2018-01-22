import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

    someValue: number;
    otherValue: number;
    reportsSource: {aggregates: number[], labels: string[]};
    exportButtons = [{
        type: 'print',
        disabled: false,
        name: 'Print',
        tooltip: 'Click to export a pdf'
      },
      {
        type: 'export',
        disabled: false,
        name: 'Export',
        tooltip: 'export report data in csv format'
      }
    ];
    console.log(export_types)

    button(e){
    alert("hi");
    }

  ngOnInit() {
  }

}
