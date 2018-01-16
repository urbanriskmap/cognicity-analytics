import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { CustomMaterialsModule } from '../custom-materials.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
