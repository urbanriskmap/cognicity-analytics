import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input() id: number;
  @Input() message: string;
  @Input() link: string;
  @Input() image_link: string;


  constructor() {
  }

  submit() {
    console.log('Submiting ad for review');
    console.log(this.id);
  }

  ngOnInit() {
  }

}
