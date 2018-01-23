import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  projectLogos = [
    {id: 'usaidLogo', src: '../../assets/images/usaid_logo.png'},
    {id: 'bnpbLogo', src: '../../assets/images/bnpb_logo.png'},
    {id: 'urlLogo', src: '../../assets/images/url_logo.svg'}
  ];

  startDate: string;
  endDate: string;
  lastUpdate: string;
  currentDate: string;

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) {
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
    switch (type) {
      case 'print':
        window.print();
      // case 'export':
      //
    }
  }

  getDateTime(dateString, adjustOffset) {
    let date;
    if (adjustOffset) {
      const milliseconds = Date.parse(dateString.replace('%2B', '.'));
      const offsetMilliseconds = (new Date()).getTimezoneOffset() * 60 * 1000;
      date = new Date(milliseconds - offsetMilliseconds);
    } else {
      date = new Date(dateString.replace('%2B', '.'));
    }
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  ngOnInit() {
    this.currentDate = (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString();
    this.route.queryParams.subscribe((params: Params) => {
      this.startDate = this.getDateTime(params['start'], true);
      this.endDate = this.getDateTime(params['end'], true);
      this.lastUpdate = this.getDateTime(params['updated'], false);
    });
  }
}
