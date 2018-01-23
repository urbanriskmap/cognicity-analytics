import { Component, Input, OnInit } from '@angular/core';

import { TableService } from '../services/table.service';

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
    depthRange: 'Range of Flood Depths (cm)'
  };

  tableData = [];

  exportButtons = [{
      type: 'print',
      name: 'Print',
      tooltip: 'Click to print'
    },
    {
      type: 'export',
      name: 'Export',
      tooltip: 'Export report data in csv format'
    }
  ];

  constructor(private tableService: TableService) {
    for (const i in this.tableService.districts) {
      if (this.tableService.districts[i]) {
        const district = this.tableService.districts[i];
        this.tableData.push({
          district: district.name,
          totalReports: district.reportsCount,
          totalFloodedAreas: {
            parent: district.parentAreaCount,
            local: district.localAreaCount
          },
          depthRange: {
            min: district.minDepth,
            max: district.maxDepth
          }
        });
      }
    }
  }

  output(type) {

  }

  ngOnInit() {
  }

}
