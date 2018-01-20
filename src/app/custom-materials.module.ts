import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
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
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    MatDialog
  ]
})
export class CustomMaterialsModule { }
