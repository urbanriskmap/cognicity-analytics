import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input() id: number;
  @Input() message: string;
  @Input() link: string;
  @Input() image_url: string;


  constructor(
    private httpService: HttpService
  ) {
  }

  submit() {
    this.httpService.submitAdForApproval(this);
  }

  play() {
    // once facebook has approved the ad you need to
    // Move from 'PAUSED' to 'ACTIVE'

  }

  ngOnInit() {
  }
}
