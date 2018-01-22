import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ReportComponent } from './report/report.component';

import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomMaterialsModule } from './custom-materials.module';

import { AuthService } from './services/auth.service';
import { TableService } from './services/table.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    CustomMaterialsModule
  ],
  providers: [
    AuthService,
    TableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
