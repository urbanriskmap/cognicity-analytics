import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MatMomentDateModule
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MatListModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
  ],
  exports: [
    NoopAnimationsModule,
    FormsModule,
    CdkTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [
    MatDialog,
    {provide: MAT_DATE_LOCALE, useValue: 'id'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class CustomMaterialsModule { }
