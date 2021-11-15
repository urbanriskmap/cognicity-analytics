import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TableService } from '../services/table.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  regionData = [];
  districtData = [];
  disaster = this.tableService.totalDisaster;

  projectLogos = [
    {id: 'usaidLogo', src: '../../assets/images/usaid_logo.png'},
    {id: 'bnpbLogo', src: '../../assets/images/bnpb_logo.png'},
    {id: 'urlLogo', src: '../../assets/images/url_logo.svg'}
  ];

  floodState: string;

  lastUpdate: string;

  constructor(
    private tableService: TableService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    public timeService: TimeService
  ) {
    for (const i in this.tableService.districts) {
      if (this.tableService.districts[i]) {
        const district = this.tableService.districts[i];
        this.districtData.push({
          district: district.name,
          totalReports: district.reportsCount,
          totalParent: district.parentAreasCount,
          stateGroups: this.getFloodStateGroups(district.parentAreas)
        });
      }
    }
    for (const i in this.tableService.regions) {
      if (this.tableService.regions[i]) {
        const district = this.tableService.regions[i];
        
        this.regionData.push({
          name: district.name,
          floodCount: district.floodCount,
          earthquakeCount: district.earthquakeCount,
          windCount: district.windCount,
          hazeCount: district.hazeCount,
          fireCount: district.fireCount,
          volcanoCount: district.volcanoCount,
          areaCount: district.areaCount
        });
      }
    }
  }

  getFloodStateGroups(areas) {
    const stateGroups = [];

    // Iterate over parent areas
    for (const area in areas) {
      if (area) {

        // Iterate over local areas in each parent
        for (const local of areas[area].localAreas) {

          // Check for existing stateGroup
          let stateGroupStored = false;
          if (stateGroups.length) {
            for (const group of stateGroups) {
              if (group.state === local.maxState) {
                stateGroupStored = true;
              }
            }
          }

          // Push stateGroup if not already stored
          if (!stateGroups.length || !stateGroupStored) {
            stateGroups.push({
              state: local.maxState,
              parentAreas: []
            });
          }

          for (const group of stateGroups) {
            // Select group by state
            if (group.state === local.maxState) {

              // Check for existing parentArea
              let parentAreaStored = false;
              if (group.parentAreas.length) {
                for (const parent of group.parentAreas) {
                  if (parent.name === areas[area].name) {
                    parentAreaStored = true;
                  }
                }
              }

              // Push parentArea if not already stored
              if (!group.parentAreas.length || !parentAreaStored) {
                group.parentAreas.push({
                  name: areas[area].name,
                  localAreas: []
                });
              }

              // Check for object with same parent area name, push local area
              for (const storedParent of group.parentAreas) {
                // Select parentArea by name
                if (storedParent.name === areas[area].name) {
                  // Push local area name
                  storedParent.localAreas.push(local.name);
                }
              }
            }
          }
        }
      }
    }

    return stateGroups;
  }

  output(type) {
    switch (type) {
      case 'print':
        window.print();
      // case 'export':
      //
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.timeService.setReportParams(params['updated']);
    });
  }
}
