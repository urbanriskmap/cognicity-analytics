import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  tableHeaders = {
    district: 'District',
    totalReports: 'Total Reports',
    totalFloodedAreas: {
      parent: 'Number of Flood Affected Kelurahan',
      local: 'Number of Flood Affected RWs'
    },
    heightRange: 'Range of Flood Height (cm)'
  };

  tableData: {
    district: string,
    totalReports: number,
    totalFloodedAreas: {
      parent: number,
      local: number
    },
    heightRange: {
      min: number,
      max: number
    }
  }[];

  exportButtons = [{
      type: 'print',
      name: 'Print',
      tooltip: 'Click to export a pdf'
    },
    {
      type: 'export',
      name: 'Export',
      tooltip: 'Export report data in csv format'
    }
  ];

  constructor() {
    // Placeholder table data
    this.tableData = [
      {district: 'North', totalReports: 8, totalFloodedAreas: {
        parent: 3, local: 2
      }, heightRange: {
        min: 7, max: 78
      }},
      {district: 'South', totalReports: 8, totalFloodedAreas: {
        parent: 3, local: 2
      }, heightRange: {
        min: 7, max: 78
      }},
      {district: 'East', totalReports: 8, totalFloodedAreas: {
        parent: 3, local: 2
      }, heightRange: {
        min: 7, max: 78
      }},
      {district: 'West', totalReports: 8, totalFloodedAreas: {
        parent: 3, local: 2
      }, heightRange: {
        min: 7, max: 78
      }},
      {district: 'Greater', totalReports: 8, totalFloodedAreas: {
        parent: 3, local: 2
      }, heightRange: {
        min: 7, max: 78
      }}
    ];
  }

  output(type) {

  }

  ngOnInit() {
  }

}
